const express = require('express');
const bcrypt = require("bcrypt")

const crudeRoutes = (Model, routeName) => {
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const item = new Model(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/many', async (req, res) => {
    try {
        const items = await Model.insertMany(req.body); // array
        res.status(201).json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const items = await Model.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:field/:value', async (req, res) => {
    try {
        const items = await Model.find({ [req.params.field]: req.params.value });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

return router;

};

const authRoutes = (User) => {
  const router = express.Router();

  // Signup
  router.post('/signup', async (req, res) => {
    const { username, number, password, role } = req.body;
    if (!number || !password || !role) return res.status(400).json({ error: 'Missing fields' });

    const exist = await User.findOne({ number });
    if (exist) return res.status(400).json({ error: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, number, password: hashed, role });
    res.json({ message: 'Signup success', user });
  });

  // Login
  router.post('/login', async (req, res) => {
    const { number, password, role } = req.body;
    if (!number || !password || !role) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ number, role });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Wrong password' });

    res.json({ message: 'Login success', user });
  });

  return router;
};



module.exports = {crudeRoutes, authRoutes};
