const express = require("express");

const app = express();

app.use("/users", require("./routes/user-router"));
app.use("/providers", require("./routes/provider-router"));
app.use("/properties", require("./routes/property-router"));
app.use("", require("./routes/booking-router"));

app.listen(3000, () => console.log("server running on port 3000"));