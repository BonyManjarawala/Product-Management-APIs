const express = require('express')
const app = express()
app.use(express.json());
const port = 5000;


const company = require("./routes/company");
const seller = require("./routes/seller");
const product = require("./routes/product");


app.get('/', (req, res) => res.send('Hello World!'));

// Add Company

app.post("/addcompany",(req,res) => {
    const companyid = req.body.companyid;
    const name = req.body.name;
    const productid = req.body.productids;
    const cname = company.filter((c)=> c.name === name);
    if(cname.length === 0)
    {
        return res.json({ data:" Company details added succesfully",company_id:companyid,Name:name,Productid:productid});

    }
    else
    {
        return res.json({ data:"Company names already taken"});
    }
});

// Add Seller

app.post("/addseller",(req,res) => {
    const sellerid = req.body.sellerid;
    const name = req.body.name;
    const productid = req.body.productids;
    const sname = seller.filter((sel) => sel.name === name);
    if(sname.length === 0)
    {
        return res.json({ data:"Seller details added succesfully",seller_id:sellerid,Name:name,Productid:productid});

    }
    else
    {
        return res.json({ data:"Seller name already taken"});
    }
});

//Add Product

app.post("/addproduct",(req,res) => {
    const sellerid = req.body.sellerid;
    const name = req.body.name;
    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const companyid = req.body.companyid;
    const productid = req.body.productid;
    const pname = product.filter((sel) => sel.name === name);
    if(pname.length === 0)
    {
        return res.json({ data:"Product details added  succesfully",seller_id:sellerid,Name:name,Productid:productid,Title:title,Price:price});

    }
    else
    {
        return res.json({ data:"Product ID already taken"});
    }
});

//Retrieve
//Company

app.post("/fetchcompany",(req,res) => {
    const name = req.body.title;
    const pname = product.filter((p)=> (p.title === name));
    if(pname.length === 1)
    {
        const companyid = pname[0].companyid;
        const comp = company.filter((c)=> c.companyid === companyid);
        if(comp.length === 1)
        {
            return res.json({ data:"Company details",product_item:name,Company_id:companyid,Company_name:comp[0].name,Product_id:comp[0].productids});
        }

    }
    else
    {
        return res.json({ data:"NO Such Company"});
    }
});

//Seller

app.post("/fetchseller",(req,res) => {
    const name1 = req.body.title;
    const pname = product.filter((p)=> (p.title === name1));
    if(pname.length === 1)
    {
        const seller_id = pname[0].sellerid;
        const sell = seller.filter((s)=> (s.sellerid == seller_id));
        if(sell.length === 1)
        {
            return res.json({ data:"company details",product_item:name1,Seller_id:seller_id,Seller_name:sell[0].name,Product_id:sell[0].productids});
        }

    }
    else
    {
        return res.json({ data:"No Such seller"});
    }
});

//Product

app.post("/fetchproduct",(req,res) => {
    const name = req.body.name;
    const cname = company.filter((c)=> (c.name === name));
    if(cname.length === 1)
    {
        const productids = cname[0].productids;
        const prod = product.filter((p)=> p.productid == productids);
        if(prod.length === 1)
        {
            return res.json({ data:"company details",CompanyName:name,Products_id:productids,Product_name:prod[0].title,Product_price:prod[0].price});
        }

    }
    else
    {
        return res.json({ data:"No Such Company"});
    }
});

//Update Company

app.post("/updatecompany",(req,res) => {
    const companyid = req.body.companyid;
    const productid = req.body.productids;
    const cname = company.filter((c)=> c.companyid === companyid);
    if(cname.length === 1)
    {
        return res.json({ data:"Company Products updated succesfully",company_id:companyid,New_Productid:productid});

    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

// Updated Seller

app.post("/updateseller",(req,res) => {
    const sellerid = req.body.sellerid;
    const productid = req.body.productids;
    const sname = seller.filter((s)=> s.sellerid === sellerid);
    if(sname.length === 1)
    {
        return res.json({ data:"Seller Products updated succesfully",seller_id:sellerid,New_Productid:productid});

    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

// Updated Product

app.post("/updateproduct",(req,res) => {
    const category = req.body.category;
    const productid = req.body.productid;
    const pname = product.filter((s)=> s.productid === productid);
    if(pname.length === 1)
    {
        return res.json({ data:"Products category updated succesfully",New_category:category,For_Productid:productid});

    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//Delete company

app.post("/deletecompany",(req,res) => {
    const companyid = req.body.companyid;
    
    const cname = company.filter((c)=> c.companyid === companyid);
    if(cname.length === 1)
    {
        return res.json({ data:"Company deleted succesfully",Deleted:cname[0].name});

    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

//Delete Seller

app.post("/deleteseller",(req,res) => {
    const sellerid = req.body.sellerid;
    const sname = seller.filter((s)=> s.sellerid === sellerid);
    if(sname.length === 1)
    {
        return res.json({ data:"Seller deleted succesfully",Deleted:sname[0].name});

    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

//Delete Product

app.post("/deleteproduct",(req,res) => {
    const productid = req.body.productid;
    const pname = product.filter((s)=> s.productid === productid);
    if(pname.length === 1)
    {
        return res.json({ data:"Products deleted succesfully",Deleted:pname[0].title});

    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

app.listen(port, () => console.log(`Application running on port 5000!`));
