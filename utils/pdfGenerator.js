const fs = require("fs");
const PDFDocument = require("pdfkit");





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
      .image("logo.png", 50, 45, { width: 50 })
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


  function generateCustomerInformation(doc, invoice) {
    const shipping = invoice.shipping;
  
    doc
      .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
      .text(`Invoice Date: ${new Date()}`, 50, 215)
      .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)
  
      .text(shipping.name, 300, 200)
      .text(shipping.address, 300, 215)
      .text(`${shipping.city}, ${shipping.state}, ${shipping.country}`, 300, 130)
      .moveDown();
  }

  function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
      .text(c3, 280, y, { width: 90, align: "right" })
      .text(c4, 370, y, { width: 90, align: "right" })
      .text(c5, 0, y, { align: "right" });
  }

  function generateInvoiceTable(doc, invoice) {
    let i,
      invoiceTableTop = 330;
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.item,
        item.description,
        item.amount / item.quantity,
        item.quantity,
        item.amount
      );
    }
  }
  async function createInvoice(invoice, path,) {
    let doc = new PDFDocument({ margin: 50 });
  
    await generateHeader(doc);
    await generateCustomerInformation(doc, invoice);
    await generateInvoiceTable(doc, invoice);
    await generateFooter(doc);
  
    await doc.end();
    await doc.pipe(fs.createWriteStream(path));
  }

  createInvoice(invoice,'/Invoice')

