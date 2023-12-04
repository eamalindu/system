const exportToExcel = (jsonData, fileName, columns) => {
    var filteredData = jsonData.map(item => {
        var filteredItem = {};
        columns.forEach(column => {
            var fieldName = column.name;
            var nestedProperties = column.data.split('.');
            // Traverse the nested properties to get the final value
            var value = item;
            for (var i = 0; i < nestedProperties.length; i++) {
                value = value[nestedProperties[i]];
                if (value === undefined) {
                    // Handle undefined values to prevent errors
                    value = null;
                    break;
                }
            }
            filteredItem[fieldName] = value;
        });
        return filteredItem;
    });

    var ws = XLSX.utils.json_to_sheet(filteredData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "Inquiries from"+fileName + ".xlsx");
}