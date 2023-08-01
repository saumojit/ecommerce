import * as XLSX from 'xlsx'
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate"

// Simple Function
// Function used to export Excel with No Styling.
export const exportToExcel_simple = (data, file_name) => {
    const workbook = XLSX.utils.book_new()    // excel book
    const worksheet = XLSX.utils.json_to_sheet(data) // excel tab
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1") // tab gets appended to book
    XLSX.writeFile(workbook, file_name) //file generation
}


// Complext Function
// Function used to export Excel with Styling
export const exportToExcel = (data, file_name) => {
//XLSX.writeFile(handleExport(data), 'new_products_excel.xlsx') ===> not working as above
handleExport(data).then((url) => {
    // console.log(url)
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", url)
    downloadAnchorNode.setAttribute("download", file_name)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
})
}


// export const downloadExcelTemplate=(data, file_name)=>{
    
// }

const workbook2blob = (workbook) => {
    const wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
    }

    const wbout = XLSX.write(workbook, wopts)

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream",
    })

    return blob
}

const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length)
    // console.log(buf)

    //create a 8 bit integer array
    const view = new Uint8Array(buf)
    // console.log(view)
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0 ;i !== s.length ;++i) {
        // console.log(s.charCodeAt(i))
        view[i] = s.charCodeAt(i)
    }
    return buf
}

const handleExport = (data) => {
    const title = [{ A: "Products Details" }]

    let table1 = [
        {
            A: "ID",
            B: "NAME",
            C: "IMAGE",
            D: "BRAND",
            E: "CATEGORY",
            F: "DESCRIPTION",
            G: "RATING",
            H: "REVIEWS COUNT",
            I: "PRICE ($)",
            J: "COUNT IN STOCK",
            K: "CREATION DATE",
            L: "USER ID",
        },
    ]

    data.forEach((row) => {

        table1.push({
            A: row._id,
            B: row.name,
            C: row.image,
            D: row.brand,
            E: row.category,
            F: row.description,
            G: row.rating,
            H: row.numReviews,
            I: row.price,
            J: row.countInStock,
            K: row.createdAt,
            L: row.user
        })
    })
    const finalData = [...title, ...table1]

    //create a new workbook
    const wb = XLSX.utils.book_new()
    const sheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true })
    XLSX.utils.book_append_sheet(wb, sheet, "PRODUCT DETAIL LIST")

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.
    const workbookBlob = workbook2blob(wb)

    const dataInfo = {
        titleRange: "A1:L1",
        theadRange: "A2:L2"
    }

    return addStyle(workbookBlob, dataInfo)
}

const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
        workbook.sheets().forEach((sheet) => {
            sheet.usedRange().style({
                fontFamily: "Calibri",
                verticalAlignment: "center",
                border: "1px solid black",
                bottomBorder: true,
                rightBorder: true,
            })
            sheet.column("A").width(35)
            sheet.column("B").width(35)
            sheet.column("C").width(17)
            sheet.column("D").width(15)
            sheet.column("E").width(15)
            sheet.column("F").width(60)
            sheet.column("G").width(10)
            sheet.column("H").width(10)
            sheet.column("I").width(10)
            sheet.column("J").width(10)
            sheet.column("K").width(25)
            sheet.column("K").width(15)

            sheet.range(dataInfo.titleRange).merged(true).style({
                bold: true,
                horizontalAlignment: "center",
                verticalAlignment: "center",
                fill: "FFFF00"
            })

            sheet.range(dataInfo.theadRange).style({
                fontColor:"FFFFFF",
                fill: "111E9C",
                bold: true,
                horizontalAlignment: "center",
                wrapText:true,
                bottomBorder:true,
                rightBorder:true
            })
        })

        return  workbook 
                .outputAsync()
                .then((workbookBlob) => URL.createObjectURL(workbookBlob))
    })
}