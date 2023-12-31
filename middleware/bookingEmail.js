import nodemailer from "nodemailer";

export const receiveBookingEmail = (userEmail, userNames) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
    debug: true,
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject: "Your Holidays Planners Tour Request Reservation is Received!",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Confirmation - Holidays Planners</title>
    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .header {
        background-color: #009688;
        padding: 20px;
        text-align: center;
      }
      .header img {
        max-width: 200px;
        height: auto;
      }
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }
      p {
        color: #666;
        font-size: 16px;
        margin: 0;
        text-align: center;
      }
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #009688;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }
      .button:hover {
        background-color: #007a6e;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a
        href="https://holiday-planer-project.onrender.com/holidays/tours/gettours"
        ><img
          src="https://html.geekcodelab.com/holiday-planners/assets/images/logo.png"
          alt="HolidaysPlanners logo"
      /></a>
    </div>
    <div class="content">
      <h1>Payment Confirmation - Holidays Planners</h1>
      <p>
        Dear ${userNames?.split(" ")[0]},
        <br /><br />
        Thank you for booking a tour with Holidays Planners! We're excited to
        have you join us on this adventure. To complete your booking, please
        choose your preferred method of payment.
      </p>
      <div class="button-container">
        <a
          href="../htmlFiles/bookingMethod.html"
          class="button"
          >Select Payment Method</a
        >
      </div>
    </div>
    <div class="footer">
      If you have any questions or need assistance with the payment process or
      any other inquiries, please don't hesitate to reach out. We are here to
      ensure your experience with us is as smooth and enjoyable as possible.
      <br /><br /><br />
      Best regards,
    </div>
  </body>
</html>
`,
  };

  transporter.sendMail(message);
};
