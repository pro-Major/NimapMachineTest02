const express = require('express')
const db = require('../models')
const fs = require("fs");
const PDFDocument = require("pdfkit");



exports.createOrder = async (req, res) => {
    try {
        console.log(req.user)
        const data = await db.Order.create({
            user: req.user.id,
            product: req.body.product,
            quantity: req.body.quantity
        })
        res.status(200).json({
            orderSuccess: true,
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            orderSuccess: false,
            error: error.name,

        })

    }
}

exports.getOrders = async (req, res) => {
    try {
        const data = await db.Order.findAndCountAll({
            include: [
                {
                    model: db.Products,
                    attributes: ['PName', 'price'],
                   
                },
                {
                    model: db.User,
                    attributes: ['name']
                }
            ]
        })
        res.status(200).json({
            success: true,
            TotalOrders: data.count,
            Orders: data.rows
        })
    } catch (error) {
        console.log(error)

        return res.status(404).json({
            message: "Something went wrong ",
            error: error.name
        })
    }
}




//Invoice Generator 
const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000
      }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
  };


  //Adding Static Data to PDFDocument  i.e Logo,Footer,etc.
  function generateHeader(doc) {
    doc
      .image("./uploads/logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("ACME Inc.", 110, 57)
      .fontSize(10)
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();
  }
  
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }
function createInvoice(invoice, path) {
    let doc = new PDFDocument({ margin: 50 });
  
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);
  
    doc.end();
    doc.pipe(fs.createWriteStream(path));
  }