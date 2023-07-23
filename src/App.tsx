import 'react-quill/dist/quill.snow.css';

import FileSaver from 'file-saver';
import {  useState } from 'react';
import ReactQuill from 'react-quill';


export default function App() {
  const [editorContentHeader, setEditorContentHeader] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [editorContentFooter, setEditorContentFooter] = useState<string>('');

  const handleContentChangeHeader = (content: string) => {
    setEditorContentHeader(content);
  };

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const handleContentChangeFooter = (content: string) => {
    setEditorContentFooter(content);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // Temel metin biçimlendirme düğmeleri
      [{ color: [] }, { background: [] }], // Metni renklendirme ve arkaplan rengini değiştirme düğmeleri
      ['blockquote', 'code-block'], // Alıntı ve kod bloğu ekleme düğmeleri
      [
        { header: 1 },
        { header: 2 },
        { header: 3 },
        { header: 4 },
        { header: 5 },
        { header: 6 },
      ], // Başlık düğmeleri
      [{ list: 'ordered' }, { list: 'bullet' }], // Sıralı ve sırasız liste düğmeleri
      [{ script: 'sub' }, { script: 'super' }], // Alt simge ve üst simge düğmeleri
      [{ indent: '-1' }, { indent: '+1' }], // Girinti artırma ve azaltma düğmeleri
      [{ align: [] }], // Metni hizalama düğmeleri
      ['link', 'image', 'video'], // Link, resim ve video ekleme düğmeleri
      ['clean'], // Tüm biçimlemeyi temizleme düğmesi
    ],
  };

  const customTags = [
    { trigger: 'link seçildiyse', tag: 'a', style: 'href' },
    { trigger: 'kalın metin seçildiyse', tag: 'strong', style: 'text' },
    { trigger: 'renkli metin seçildiyse', tag: 'span', style: 'color: red;' },
    { trigger: 'image seçildiyse', tag: 'img', style: 'width: 800px;' },
    // Diğer tipler için aynı şekilde customTags'e öğeler ekleyebilirsiniz
  ];

  const headerContent = (content: string) => {
    const lines = content.split('\n');
    const processedLines = lines.map((line) => {
      for (const customTag of customTags) {
        if (line.startsWith(customTag.trigger)) {
          const customContent = line.replace(`${customTag.trigger} `, '');
          return `


                <${customTag.tag} style="${customTag.style} display: block; border: 0; outline: none; text-decoration: none; width=800px">${customContent}</${customTag.tag}>

          `;
        }
      }
      return line;
    });

    return processedLines.join('<br>');
  };
  const processContent = (content: string) => {
    const lines = content.split('\n');
    const processedLines = lines.map((line) => {
      for (const customTag of customTags) {
        if (line.startsWith(customTag.trigger)) {
          const customContent = line.replace(`${customTag.trigger} `, '');
          return `
          <td
            align="left"
            style="
              padding: 0 60px;
              margin: 0;
              font-size: 18px;
              color: #fff;
              background-color: #182224;
            "
          >
          <${customTag.tag} style="${customTag.style}">${customContent}</${customTag.tag}>
          </td>

          `;
        }
      }
      return line;
    });

    return processedLines.join('<br>');
  };
  const footerContent = (content: string) => {
    const lines = content.split('\n');
    const processedLines = lines.map((line) => {
      for (const customTag of customTags) {
        if (line.startsWith(customTag.trigger)) {
          const customContent = line.replace(`${customTag.trigger} `, '');
          return `
            <${customTag.tag} style="${customTag.style} display: block; border: 0; outline: none; text-decoration: none; width=800px">${customContent}</${customTag.tag}>
          `;
        }
      }
      return line;
    });

    return processedLines.join('<br>');
  };

  const handleExport = () => {
    const htmlTemplate = `


    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      style="font-family: 'Poppins', sans-serif"
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <meta charset="charset=ISO-8859-1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <title>Yeni mesaj 3</title>

        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 20px 10px 20px !important;
          }
          [data-ogsb] .es-button.es-button-1 {
            padding: 10px 20px !important;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150% !important;
            }
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
              line-height: 120%;
            }
            h1 {
              font-size: 30px !important;
              text-align: left;
            }
            h2 {
              font-size: 24px !important;
              text-align: left;
            }
            h3 {
              font-size: 20px !important;
              text-align: left;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 30px !important;
              text-align: left;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 24px !important;
              text-align: left;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
              text-align: left;
            }
            .es-menu td a {
              font-size: 14px !important;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 14px !important;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 14px !important;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 14px !important;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px !important;
            }
            *[class="gmail-fix"] {
              display: none !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-button-border {
              display: inline-block !important;
            }
            a.es-button,
            button.es-button {
              font-size: 18px !important;
              display: inline-block !important;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .es-adapt-td {
              display: block !important;
              width: 100% !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-m-p0 {
              padding: 0 !important;
            }
            .es-m-p0r {
              padding-right: 0 !important;
            }
            .es-m-p0l {
              padding-left: 0 !important;
            }
            .es-m-p0t {
              padding-top: 0 !important;
            }
            .es-m-p0b {
              padding-bottom: 0 !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            table.es-social {
              display: inline-block !important;
            }
            table.es-social td {
              display: inline-block !important;
            }
            .es-desk-hidden {
              display: table-row !important;
              width: auto !important;
              overflow: visible !important;
              max-height: inherit !important;
            }
            .es-m-p5 {
              padding: 5px !important;
            }
            .es-m-p5t {
              padding-top: 5px !important;
            }
            .es-m-p5b {
              padding-bottom: 5px !important;
            }
            .es-m-p5r {
              padding-right: 5px !important;
            }
            .es-m-p5l {
              padding-left: 5px !important;
            }
            .es-m-p10 {
              padding: 10px !important;
            }
            .es-m-p10t {
              padding-top: 10px !important;
            }
            .es-m-p10b {
              padding-bottom: 10px !important;
            }
            .es-m-p10r {
              padding-right: 10px !important;
            }
            .es-m-p10l {
              padding-left: 10px !important;
            }
            .es-m-p15 {
              padding: 15px !important;
            }
            .es-m-p15t {
              padding-top: 15px !important;
            }
            .es-m-p15b {
              padding-bottom: 15px !important;
            }
            .es-m-p15r {
              padding-right: 15px !important;
            }
            .es-m-p15l {
              padding-left: 15px !important;
            }
            .es-m-p20 {
              padding: 20px !important;
            }
            .es-m-p20t {
              padding-top: 20px !important;
            }
            .es-m-p20r {
              padding-right: 20px !important;
            }
            .es-m-p20l {
              padding-left: 20px !important;
            }
            .es-m-p25 {
              padding: 25px !important;
            }
            .es-m-p25t {
              padding-top: 25px !important;
            }
            .es-m-p25b {
              padding-bottom: 25px !important;
            }
            .es-m-p25r {
              padding-right: 25px !important;
            }
            .es-m-p25l {
              padding-left: 25px !important;
            }
            .es-m-p30 {
              padding: 30px !important;
            }
            .es-m-p30t {
              padding-top: 30px !important;
            }
            .es-m-p30b {
              padding-bottom: 30px !important;
            }
            .es-m-p30r {
              padding-right: 30px !important;
            }
            .es-m-p30l {
              padding-left: 30px !important;
            }
            .es-m-p35 {
              padding: 35px !important;
            }
            .es-m-p35t {
              padding-top: 35px !important;
            }
            .es-m-p35b {
              padding-bottom: 35px !important;
            }
            .es-m-p35r {
              padding-right: 35px !important;
            }
            .es-m-p35l {
              padding-left: 35px !important;
            }
            .es-m-p40 {
              padding: 40px !important;
            }
            .es-m-p40t {
              padding-top: 40px !important;
            }
            .es-m-p40b {
              padding-bottom: 40px !important;
            }
            .es-m-p40r {
              padding-right: 40px !important;
            }
            .es-m-p40l {
              padding-left: 40px !important;
            }
            .h-auto {
              height: auto !important;
            }
          }
        </style>
      </head>
      <body
        style="
          width: 100%;
          font-family: 'Poppins', sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
      >
        <div class="es-wrapper-color" style="background-color: #ffffff">
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
              background-color: #2f3538;
            "
          >
            <tr>
              <td valign="top" style="padding: 0; margin: 0">
                <table
                  class="es-header"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-header-body"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #0E0F13;
                          width: 800px;
                        "
                      >

                        <tr>
                          <td align="left" style="padding: 0; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 800px"
                                >


                                    <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                      "
                                    >
                                    ${headerContent(editorContentHeader)}

                                    </td>
                                  </tr>

                                  </table>


                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                        margin: 0;
                                        font-size: 18px;
                                        color: #fff;
                                        background-color: #182224;
                                      "
                                    >
                                    ${processContent(editorContent)}
                                    </td>
                                    </tr>

                                    <table
                                    class="es-footer-body"
                                    cellspacing="0"
                                    cellpadding="0"
                                    bgcolor="#ffffff"
                                    align="center"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      background-color: #0E0F13;
                                      width: 800px;
                                    "
                                  >
                                    <tr>
                                      <td align="left" style="padding: 0; margin: 0">
                                      ${footerContent(editorContentFooter)}

                                      </td>
                                    </tr>
                                  </table>







                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>


        `;

    const blob = new Blob([htmlTemplate], { type: 'text/html;charset=utf-8' });
    FileSaver.saveAs(blob, 'metin_editoru.html');
  };

  const renderPreview = () => {
    const htmlContent = `


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family: 'Poppins', sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <meta charset="charset=ISO-8859-1"/>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <title>Yeni mesaj 3</title>

    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 10px 20px 10px 20px !important;
      }
      [data-ogsb] .es-button.es-button-1 {
        padding: 10px 20px !important;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: inline-block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0 !important;
        }
        .es-m-p0r {
          padding-right: 0 !important;
        }
        .es-m-p0l {
          padding-left: 0 !important;
        }
        .es-m-p0t {
          padding-top: 0 !important;
        }
        .es-m-p0b {
          padding-bottom: 0 !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        table.es-social {
          display: inline-block !important;
        }
        table.es-social td {
          display: inline-block !important;
        }
        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
        .es-m-p5 {
          padding: 5px !important;
        }
        .es-m-p5t {
          padding-top: 5px !important;
        }
        .es-m-p5b {
          padding-bottom: 5px !important;
        }
        .es-m-p5r {
          padding-right: 5px !important;
        }
        .es-m-p5l {
          padding-left: 5px !important;
        }
        .es-m-p10 {
          padding: 10px !important;
        }
        .es-m-p10t {
          padding-top: 10px !important;
        }
        .es-m-p10b {
          padding-bottom: 10px !important;
        }
        .es-m-p10r {
          padding-right: 10px !important;
        }
        .es-m-p10l {
          padding-left: 10px !important;
        }
        .es-m-p15 {
          padding: 15px !important;
        }
        .es-m-p15t {
          padding-top: 15px !important;
        }
        .es-m-p15b {
          padding-bottom: 15px !important;
        }
        .es-m-p15r {
          padding-right: 15px !important;
        }
        .es-m-p15l {
          padding-left: 15px !important;
        }
        .es-m-p20 {
          padding: 20px !important;
        }
        .es-m-p20t {
          padding-top: 20px !important;
        }
        .es-m-p20r {
          padding-right: 20px !important;
        }
        .es-m-p20l {
          padding-left: 20px !important;
        }
        .es-m-p25 {
          padding: 25px !important;
        }
        .es-m-p25t {
          padding-top: 25px !important;
        }
        .es-m-p25b {
          padding-bottom: 25px !important;
        }
        .es-m-p25r {
          padding-right: 25px !important;
        }
        .es-m-p25l {
          padding-left: 25px !important;
        }
        .es-m-p30 {
          padding: 30px !important;
        }
        .es-m-p30t {
          padding-top: 30px !important;
        }
        .es-m-p30b {
          padding-bottom: 30px !important;
        }
        .es-m-p30r {
          padding-right: 30px !important;
        }
        .es-m-p30l {
          padding-left: 30px !important;
        }
        .es-m-p35 {
          padding: 35px !important;
        }
        .es-m-p35t {
          padding-top: 35px !important;
        }
        .es-m-p35b {
          padding-bottom: 35px !important;
        }
        .es-m-p35r {
          padding-right: 35px !important;
        }
        .es-m-p35l {
          padding-left: 35px !important;
        }
        .es-m-p40 {
          padding: 40px !important;
        }
        .es-m-p40t {
          padding-top: 40px !important;
        }
        .es-m-p40b {
          padding-bottom: 40px !important;
        }
        .es-m-p40r {
          padding-right: 40px !important;
        }
        .es-m-p40l {
          padding-left: 40px !important;
        }
        .h-auto {
          height: auto !important;
        }
      }
    </style>
  </head>
  <body
    style="
      width: 100%;
      font-family: 'Poppins', sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #ffffff">
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #2f3538;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              class="es-header"
              cellspacing="0"
              cellpadding="0"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-header-body"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#ffffff"
                    align="center"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #0E0F13;
                      width: 800px;
                    "
                  >

                    <tr>
                      <td align="left" style="padding: 0; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 800px"
                            >


                                <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                              <tr>
                                <td
                                  align="left"
                                  style="
                                    padding: 0;
                                    margin: 0;
                                  "
                                >
                                ${headerContent(editorContentHeader)}

                                </td>
                              </tr>

                              </table>


                              <tr>
                                <td
                                  align="left"
                                  style="
                                    margin: 0;
                                    font-size: 18px;
                                    color: #fff;
                                    background-color: #182224;
                                  "
                                >
                                ${processContent(editorContent)}
                                </td>
                                </tr>

                                <table
                                class="es-footer-body"
                                cellspacing="0"
                                cellpadding="0"
                                bgcolor="#ffffff"
                                align="center"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: #0E0F13;
                                  width: 800px;
                                "
                              >
                                <tr>
                                  <td align="left" style="padding: 0; margin: 0">
                                  ${footerContent(editorContentFooter)}

                                  </td>
                                </tr>
                              </table>







                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </div>
  </body>
</html>


    `;

    return { __html: htmlContent };
  };

  return (
    <div>
      <h2>Header</h2>
      <div className="editor">
          <ReactQuill
            value={editorContentHeader}
            onChange={handleContentChangeHeader}
            modules={modules}
          />
      </div>
      <h2>İçerik</h2>
      <div className="editor">
          <ReactQuill
            value={editorContent}
            onChange={handleContentChange}
            modules={modules}
          />
      </div>
      <h2>Footer</h2>
      <div className="editor">
          <ReactQuill
            value={editorContentFooter}
            onChange={handleContentChangeFooter}
            modules={modules}
          />
      </div>
      <div>
        <button className="buton" onClick={handleExport}>
          HTML Dosyası Olarak İndir
        </button>
      </div>
      <div>
        <h3>HTML Çıktısı:</h3>
        <div dangerouslySetInnerHTML={renderPreview()} />
      </div>
    </div>
  );
}
