/**
 * Google Apps Script for Wedding RSVP and Wishes
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open your Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any code in Code.gs and paste this entire file
 * 4. Click the "Deploy" button (top right) > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click "Deploy" (you will need to authorize the script)
 * 9. Copy the "Web app URL" provided
 * 10. In your React project, create a `.env` file in the root directory and add:
 *     VITE_GOOGLE_SCRIPT_URL="YOUR_COPIED_URL_HERE"
 * 11. Restart your development server
 */

function doPost(e) {
  try {
    // Parse the incoming POST request data
    var sheetName = e.parameter.sheetName;
    var data = JSON.parse(e.parameter.data);
    
    // Get the active spreadsheet
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(sheetName);
    
    // Create the sheet (tab) if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
    }
    
    var headers = [];
    var keys = Object.keys(data);
    
    // Get existing headers if the sheet isn't empty
    var lastColumn = sheet.getLastColumn();
    if (lastColumn > 0) {
      headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    }
    
    // Dynamically add missing headers based on incoming form fields
    var newHeadersAdded = false;
    keys.forEach(function(key) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
        newHeadersAdded = true;
      }
    });
    
    // Write updated headers to the first row
    if (newHeadersAdded) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // Make headers bold for better visibility
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }
    
    // Map the incoming data to the correct columns
    var rowData = headers.map(function(header) {
      return data[header] !== undefined ? data[header] : "";
    });
    
    // Add timestamp as the first column if we just created the sheet
    if (newHeadersAdded && headers.length === keys.length) {
       // Optional: You can prepend a Timestamp column here if you like
    }
    
    // Append the new row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "sheet": sheetName }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
