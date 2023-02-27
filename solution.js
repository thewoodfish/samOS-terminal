let io = [
    { "ID": 1, "scanNumber": "1", "createdOn": "2023-02-24T10:51:45.000Z" },
    { "ID": 2, "scanNumber": "2", "createdOn": "2023-02-24T10:51:55.000Z" },
    { "ID": 3, "scanNumber": "1", "createdOn": "2023-04-24T12:11:44.000Z" },
    { "ID": 4, "scanNumber": "3", "createdOn": "2023-02-24T10:51:55.000Z" },
    { "ID": 5, "scanNumber": "2", "createdOn": "2023-05-24T12:11:44.000Z" },
    { "ID": 6, "scanNumber": "1", "createdOn": "2023-06-24T12:11:44.000Z" }
];

const download = function (data) {
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: "text/csv" });
  
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);
  
    // Creating an anchor(a) tag of HTML
    const a = document.createElement("a");
  
    // Passing the blob downloading url
    a.setAttribute("href", url);
  
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute("download", "download.csv");
  
    // Performing a download with click
    a.click();
  };

function sortAndCount(io) {
    let box = {};
    let refinedData = {};
    for (var i = 0; i < io.length; i++) {
        var scanNum = io[i].scanNumber;
        !box.hasOwnProperty(scanNum) ? box[scanNum] = 1 : box[scanNum]++;
        if (!refinedData.hasOwnProperty(scanNum)) {
            refinedData[scanNum] = [scanNum, io[i]["createdOn"]];
        } else {
            !refinedData[scanNum].includes(io[i]["createdOn"]) ? refinedData[scanNum].push(io[i]["createdOn"]) : "";
        }
    }

    return {
        stat: box,
        refinedData
    }
}

function getMaxAndPopulate(stat) {
    let title = [`Tag Number`];
    let max = 0;
    for (const i in stat) {
        max = stat[i] > max ? stat[1] : max;
    }

    for (var o = 0; o < max; o++)
        title.push(`Scan [${o + 1}]`);

    return title;
}

function extractAndPopulate(headers, obj) {
    const csvString = [
        headers,
        ...Object.values(obj)
    ].map(e => e.join(","))
    .join("\n");

    download(csvString);
}


let { stat, refinedData } = sortAndCount(io);
let headers = getMaxAndPopulate(stat);


extractAndPopulate(headers, refinedData);