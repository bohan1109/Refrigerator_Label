const db = require("../models/index.js");
const nodemailer = require("nodemailer");
const label_service = require("./label.js");
const user_service = require("./user.js");

const mail_send = (mailOptions) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true, // Compliant
    requireTLS: true, // Compliant
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
  transporter.close();
};

const manual_send_mail = async (mail) => {
  for (i = 0; i < mail["users"].length; i++) {
    const five_date_later = new Date(
      new Date().setDate(new Date().getDate() + 5)
    );
    const expiry_date =
      five_date_later.getFullYear() +
      "-" +
      (five_date_later.getMonth() + 1) +
      "-" +
      five_date_later.getDate();
    console.log(expiry_date);

    !mail["text"] ? (content = "") : (content = mail["text"]);

    let mailOptions = {
      to: mail["users"][i][0],
      from: process.env.NODEMAILER_USER,
      subject: "冰箱物品管理系統提醒",
      html:
        mail_template_header +
        "<font color='black'>別忘了您的物品  <font color='blue'><b>#" +
        mail["users"][i][1] +
        " </b></font> 還在 Monospace 公共冰箱哦！<br>為維護空間會員使用權益，暫存冰箱物品以七日為限，逾保存期限、放置超過七日之物品將依空間管理規範清除。<br><br>提醒您請儘速於 <font color='red'><b>" +
        expiry_date +
        "</b></font> 前取回物品，逾期未取將由值班人員協助清除。<br>謝謝您的配合！<br><br>" +
        content +
        "</font>" +
        mail_template_footer,
    };

    mail_send(mailOptions);
  }
};

const auto_send_mail = async () => {
  const label = await label_service.owner_information();
  for (let i = 0; i < label.length; i++) {
    let array = label[i]["date"].split(" ");
    let Today = new Date();
    const date1 = new Date(array[0]);
    const date2 = new Date(
      Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate()
    );
    const diff_time = Math.abs(date2 - date1);
    const diff_day = Math.ceil(diff_time / (1000 * 60 * 60 * 24));

    if (diff_day === 7) {
      let mail = await user_service.find_mail(label[i]["userId"]);

      let mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: mail["dataValues"]["mail"],
        subject: "冰箱物品管理系統提醒",
        html:
          mail_template_header +
          "<font color='black'>您的物品 <font color='blue'><b>#" +
          label[i]["labelId"] +
          " </b></font>已在 Monospace 公共冰箱放置滿七天囉。<br>為維護空間會員使用權益，暫存冰箱之物品以七日為限，超過七日將依空間管理規範清除。<br><br>提醒您記得儘速取回，取出時別忘了掃描條碼哦。<br>謝謝您的配合！</font>" +
          mail_template_footer,
      };

      mail_send(mailOptions);
    }
  }
};

const mail_template_header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>New email template 2022-05-04</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- --> 
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]--> 
  <style type="text/css">
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:15px 30px 15px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h1 a { text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:30px!important } h3 a { text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:18px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style> 
 </head> 
 <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#EFEFEF"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#efefef"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#EFEFEF"> 
     <tr style="border-collapse:collapse"> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"></tr> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" bgcolor="#cfe2f3" style="Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;padding-bottom:40px;background-color:#cfe2f3"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://imgur.com/7JsC9xl.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="150"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="Margin:0;padding-bottom:25px;padding-top:35px;padding-left:35px;padding-right:35px"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">親愛的會員您好：</h3></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#777777;font-size:16px">`;

const mail_template_footer = `</p></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="center" style="padding:20px;Margin:0;font-size:0"> 
                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr style="border-collapse:collapse"> 
                           <td style="padding:0;Margin:0;border-bottom:0px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="center" style="padding:20px;Margin:0;font-size:0"> 
                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr style="border-collapse:collapse"> 
                           <td style="padding:0;Margin:0;border-bottom:0px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="center" style="padding:20px;Margin:0;font-size:0"> 
                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr style="border-collapse:collapse"> 
                           <td style="padding:0;Margin:0;border-bottom:0px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px">★ 此封信件為冰箱小精靈系統自動發送，請勿直接回覆。</p></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="center" style="padding:20px;Margin:0;font-size:0"> 
                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr style="border-collapse:collapse"> 
                           <td style="padding:0;Margin:0;border-bottom:0px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="left" style="padding:0;Margin:0;padding-top:40px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333"><br></h3></td> 
                      </tr> 
                      <tr style="border-collapse:collapse"> 
                       <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px">若有任何問題，歡迎洽詢空間管理員，或來電與我們聯繫！<br>客服專線｜04-22031803&nbsp;# 123<br>服務時間｜週一至週五 09：00 - 18：00</p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table></td> 
      </tr> 
    </table> 
   </div>  
  </body>
 </html>
`;

module.exports = {
  manual_send_mail,
  auto_send_mail,
};
