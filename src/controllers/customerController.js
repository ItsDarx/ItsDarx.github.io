const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM proveedor', (err, customers) => {
        if (err) {
            res.json(err);
        }
        console.log(customers);
        res.render('customers', {
            data: customers

        });
         
    });

});
};


controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO proveedor set ?', [data], (err, customer) => {
            res.redirect('/');
        });
    })

};

controller.edit =(req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM proveedor WHERE id = ?', [id], (err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update =(req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE proveedor set ? WHERE id = ?', [newCustomer,id], (err, rows) => {
            res.redirect('/');
            });
        })
 
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM proveedor WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};


module.exports = controller;