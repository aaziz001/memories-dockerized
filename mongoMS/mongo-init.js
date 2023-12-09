print("Started Adding the Users.");
db = db.getSiblingDB("memories");
db.createUser({
  user: "aziz",
  pwd: "Q4a2HY1jxVqi7T8z",
  roles: [{ role: "readWrite", db: "invixible" }],
});
print("End Adding the User Roles.");