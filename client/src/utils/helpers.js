//making singular to plural
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

//indexDB helper function, store all of the product and category data from the database in indexedDB.  this way, even without an internet connction, users can still navigate the application, view items, and even add items to their hopping cart.
//if the user leaves the application and comes back later, we'll have persisted the items in their shopping cart.  A user is more likely to complete their order if they don't have to add everything back into the cart!
//this function opens the database connection, creates the object store, and runs whatever transaction weneed to have run on a successful connection.  When we call the function, we'll open the connnectino to the database nd ten connec to the object store that we pass in as storeName.  Then we'll preform a transaction, using the method and object values to help carry it out.  We also wrap the whole thing in a Promise, making it a lot easier to wok with IndexedDB's asynchronous nature.
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open("shop-shop", 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log("There was an error");
    };

    //on database open success
    request.onsuccess = function (e) {
      //save a reference of the database to the `db` variable
      db = request.result;
      //open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, "readwrite");
      //save a reference to that object store
      store = tx.objectStore(storeName);

      //if there's any errors, let us know
      db.onerror = function (e) {
        console.log("error", e);
      };

      //switch statement to check what the valu of the method is.
      switch (method) {
        //if its put then run .put() method on the object store, overwriting any data with the matchign _id value from the objec and adding it if it can't find a match
        case "put":
          store.put(object);
          resolve(object);
          break;
        //if get, simply retrieve all data fro mthat store and retun it
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        //if delete, then delete
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      //when the transaction i complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
