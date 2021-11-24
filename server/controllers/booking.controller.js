const _ = require("lodash");
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
const Booking = require("../models/Booking");
const Restaurant = require("../models/Restaurant");




module.exports = {
    //routes GET /api/.../:endpoint, if query string, routes GET /api/.../:endpoint?name=raadaa&status=1
    index: async (req, res, next) => {
       let noQuery = _.isEmpty(req.query);
        let builder = null;
        

        Booking.find(builder).sort({created_at: -1}).exec(function (err, result) {
            if(err)
                return res.send(err);
            return res.send({success: true, data: result, message: 'Bookings retrieved successfully'});
        })
       
    },
     //routes POST /api/.../:endpoint/:id
     store: (req, res) => {
         const mailData = ""
        const booking = new Booking(req.body);
        booking.save().then(result => {
            Booking.findById(result._id).populate('restaurant_id').exec((err, result2) => {
                if (err)
                    return res.send(err);
                    // const payload = JSON.stringify(result2)
                    console.log(result2.restaurant_id.name)
                // return res.status(200).send({success: true, data: result2});
                sendMail(result2)
            })
            
           
            return res.status(200).send({success: true, data: result, message: 'Booking saved successfully'});
        }).catch(err => {
            throw err;
        })




        function sendMail(result2){
        
            var transporter = nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 587,
                service:'gmail',
                // secure: true,
                auth: {
                  user: 'apprestuarant7@gmail.com',
                  pass: 'Ogbuzs@007'
                }
              });
              
              var mailOptions = {
                from: 'apprestaurant7@gmail.com',
                to: result2.email,
                // to: result.email,
                subject: 'Restaurant reservation Details',
                // text: 'That was easy!'
                html: `<html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                     <meta name="format-detection" content="telephone=no"/>
                
                    <!-- Responsive Mobile-First Email Template by Konstantin Savchenko, 2015.
                    https://github.com/konsav/email-templates/  -->
                
                    <style>
                /* Reset styles */ 
                body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
                body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
                img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
                #outlook a { padding: 0; }
                .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
                .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
                
                /* Rounded corners for advanced mail clients only */ 
                @media all and (min-width: 560px) {
                    .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
                }
                
                /* Set color for auto links (addresses, dates, etc.) */ 
                a, a:hover {
                    color: #127DB3;
                }
                .footer a, .footer a:hover {
                    color: #999999;
                }
                
                     </style>
                
                    <!-- MESSAGE SUBJECT -->
                    <title>This is a Test message from a sandbox app</title>
                
                </head>
                
                <!-- BODY -->
                <!-- Set message background color (twice) and text color (twice) -->
                <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
                    background-color: #F0F0F0;
                    color: #000000;"
                    bgcolor="#F0F0F0"
                    text="#000000">
                
                <!-- SECTION / BACKGROUND -->
                <!-- Set message background color one again -->
                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                    bgcolor="#F0F0F0">
                
                <!-- WRAPPER -->
                <!-- Set wrapper width (twice) -->
                <table border="0" cellpadding="0" cellspacing="0" align="center"
                    width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                    max-width: 560px;" class="wrapper">
                
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                            padding-top: 20px;
                            padding-bottom: 20px;">
                
                            <!-- PREHEADER -->
                            <!-- Set text color to background color -->
                            <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
                            color: #F0F0F0;" class="preheader">
                                
                            <!-- LOGO -->
                            <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
                            <a target="_blank" style="text-decoration: none;"
                                href="https://github.com/konsav/email-templates/"><img border="0" vspace="0" hspace="0"
                                src="https://raw.githubusercontent.com/konsav/email-templates/master/images/logo-black.png"
                                width="100" height="30"
                                alt="Logo" title="Logo" style="
                                color: #000000;
                                font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                
                        </td>
                    </tr>
                
                <!-- End of WRAPPER -->
                </table>
                
                <!-- WRAPPER / CONTEINER -->
                <!-- Set conteiner background color -->
                <table border="0" cellpadding="0" cellspacing="0" align="center"
                    bgcolor="#FFFFFF"
                    width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                    max-width: 560px;" class="container">
                
                    <!-- HEADER -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                            padding-top: 25px;
                            color: #000000;
                            font-family: sans-serif;" class="header">
                                Restaurant Listing APP
                        </td>
                    </tr>
                    
                    <!-- SUBHEADER -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                            padding-top: 5px;
                            color: #000000;
                            font-family: sans-serif;" class="subheader">
                                This is a simmary of your booking
                        </td>
                    </tr>
                
                    
                
                    
                
                    <!-- LINE -->
                    <!-- Set line color -->
                    <tr>	
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                            padding-top: 25px;" class="line"><hr
                            color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
                
                    <!-- LIST -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;" class="list-item"><table align="center" border="0" cellspacing="0" cellpadding="0" style="width: inherit; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;">
                            
                            <!-- LIST ITEM -->
                            <tr>
                
                                <!-- LIST ITEM IMAGE -->
                                <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                                
                
                                <!-- LIST ITEM TEXT -->
                                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                                <td align="left" valign="top" style="font-size: 17px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                                    padding-top: 25px;
                                    color: #000000;
                                    font-family: sans-serif;" class="paragraph">
                                        <b style="color: #333333;">Hello ${result2.firstname},</b><br/>
                                        Below is your booking details, please confirm your booking.
                                </td>
                
                            </tr>
                
                            <!-- LIST ITEM -->
                            <tr>
                
                                
                
                                <!-- LIST ITEM TEXT -->
                                <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                                <td align="left" valign="top" style="font-size: 17px; font-weight: 400; line-height: 160%; border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                                    padding-top: 25px;
                                    color: #000000;
                                    font-family: sans-serif;" class="paragraph">
                                        <b style="color: #333333;">Restaurant Name:</b><p>${result2.restaurant_id.name}</p><br/>
                                        <b style="color: #333333;">Restaurant Address:</b><p>${result2.restaurant_id.formatted_address}</p><br/>
                                        <b style="color: #333333;">Number of Guest:</b><p>${result2.guest}</p><br/>
                                        <b style="color: #333333;">Date and Time:</b><p>${result2.date} ${result2.time}</p><br/>
                                        Sketch app resource file and a&nbsp;bunch of&nbsp;social media icons are&nbsp;also included in&nbsp;GitHub repository.
                                </td>
                
                            </tr>
                
                        </table></td>
                    </tr>
                
                    <!-- LINE -->
                    <!-- Set line color -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                            padding-top: 25px;" class="line"><hr
                            color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
                
                    <!-- PARAGRAPH -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                            padding-top: 20px;
                            padding-bottom: 25px;
                            color: #000000;
                            font-family: sans-serif;" class="paragraph">
                                Have a&nbsp;question? <a href="mailto:apprestaurant7@gmail.com" target="_blank" style="color: #127DB3; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 160%;">apprestaurant7@gmail</a>
                        </td>
                    </tr>
                
                <!-- End of WRAPPER -->
                </table>
                
                <!-- WRAPPER -->
                <!-- Set wrapper width (twice) -->
                <table border="0" cellpadding="0" cellspacing="0" align="center"
                    width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                    max-width: 560px;" class="wrapper">
                
                    <!-- SOCIAL NETWORKS -->
                    <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                            padding-top: 25px;" class="social-icons"><table
                            width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
                            <tr>
                
                                <!-- ICON 1 -->
                                <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                    href="#"
                                style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                    color: #000000;"
                                    alt="F" title="Facebook"
                                    width="44" height="44"
                                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png"></a></td>
                
                                <!-- ICON 2 -->
                                <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                    href="https://raw.githubusercontent.com/konsav/email-templates/"
                                style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                    color: #000000;"
                                    alt="T" title="Twitter"
                                    width="44" height="44"
                                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png"></a></td>				
                
                                <!-- ICON 3 -->
                                <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                    href="#"
                                style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                    color: #000000;"
                                    alt="G" title="Google Plus"
                                    width="44" height="44"
                                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png"></a></td>		
                
                                <!-- ICON 4 -->
                                <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                                    href="#"
                                style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                                    color: #000000;"
                                    alt="I" title="Instagram"
                                    width="44" height="44"
                                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/instagram.png"></a></td>
                
                            </tr>
                            </table>
                        </td>
                    </tr>
                
                    <!-- FOOTER -->
                    <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                            padding-top: 20px;
                            padding-bottom: 20px;
                            color: #999999;
                            font-family: sans-serif;" class="footer">
                
                                This email template was sent to&nbsp;you becouse we&nbsp;want to&nbsp;make the&nbsp;world a&nbsp;better place. You&nbsp;could change your <a href="#" target="_blank" style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">subscription settings</a> anytime.
                
                                <!-- ANALYTICS -->
                                <!-- https://www.google-analytics.com/collect?v=1&tid={{UA-Tracking-ID}}&cid={{Client-ID}}&t=event&ec=email&ea=open&cs={{Campaign-Source}}&cm=email&cn={{Campaign-Name}} -->
                                <img width="1" height="1" border="0" vspace="0" hspace="0" style="margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"
                                src="https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png" />
                
                        </td>
                    </tr>
                
                <!-- End of WRAPPER -->
                </table>
                
                <!-- End of SECTION / BACKGROUND -->
                </td></tr></table>
                
                </body>
                </html>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
    },
    //routes GET /api/.../:endpoint/:id
    // show: (req, res) => {
    //     Booking.findById(req.params.id).populate('user').exec((err, result) => {
    //         if (err)
    //             return res.send(err);
    //         return res.status(200).send({success: true, data: result, message: 'Booking retrieved successfully'});
    //     })
    // },
    //routes PUT /api/.../:endpoint/:id
    update: (req, res) => {
        req.body.updated_at = new Date();
        Booking.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if(err)
                return res.send(err);
            return res.status(200).send({success: true, data: result, message: 'Booking updated successfully'});

        })
    },
    //routes DELETE /api/.../:endpoint/:id
    destroy: (req, res) => {
        Booking.findByIdAndRemove(req.params.id, function (err, result) {
            if(err)
                res.send(err);
            return res.status(200).send({success: true, data: result, message: 'Actitvity deleted successfully'});
        })
    },



    

    
    }

