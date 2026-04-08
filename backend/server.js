const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ⏳ Artificial delay
server.use((req, res, next) => {
  setTimeout(() => next(), 800);
});


// 🔍 GET Employees (pagination + search + filter)
server.get('/employees', (req, res) => {
  let data = router.db.get('employees').value();

  let {
    page = 1,
    limit = 5,
    search = '',
    department,
    status,
    designation
  } = req.query;

  // Ensure limit is treated as a number and capped at 1000
  let limitNum = Number(limit);
  if (isNaN(limitNum) || limitNum <= 0) {
    limitNum = 5;
  } else if (limitNum > 1000) {
    limitNum = 1000;
  }

  const pageNum = Number(page) || 1;

  let result = [...data];

  // 🔎 Search by name
  if (search) {
    result = result.filter(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🎯 Filters
  if (department) {
    result = result.filter(emp => emp.department === department);
  }

  if (status) {
    result = result.filter(emp => emp.status === status);
  }

  if (designation) {
    result = result.filter(emp => emp.designation === designation);
  }

  // Calculate pagination window
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  console.log(`Fetching page ${pageNum} with limit ${limitNum}. Total filtered: ${result.length}`);

  res.json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: result.slice(start, end)
  });
});


// ➕ POST (Create Employee)
server.post('/employees', (req, res) => {
  const emp = req.body;
console.log('Post Request Recived', emp)
  // 🔴 Basic validation
  if (
    !emp.name ||
    !emp.designation ||
    !emp.department ||
    !emp.joiningDate ||
    emp.salary == null
  ) {

    return res.status(400).json({ message: 'Required fields missing' });
  }

  const newEmp = {
    id: Date.now().toString(),
    name: emp.name,
    designation: emp.designation,
    department: emp.department,
    dob: emp.dob,
    address: emp.address || [],
    education: emp.education || '',
    joiningDate: emp.joiningDate,
    experience: emp.experience || 0,
    employmentType: emp.employmentType || 'Full-time',
    status: emp.status || 'Active',
    salary: emp.salary,
    bonus: emp.bonus || 0,
    currency: emp.currency || 'INR'
  };

  router.db.get('employees').push(newEmp).write();

  res.status(201).json(newEmp);
});


// ✏️ PUT (Update Employee)
server.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const emp = router.db.get('employees').find({ id }).value();

  if (!emp) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  router.db.get('employees')
    .find({ id })
    .assign(updatedData)
    .write();

  const updated = router.db.get('employees').find({ id }).value();

  res.json(updated);
});


// ❌ DELETE Employee
server.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  const emp = router.db.get('employees').find({ id }).value();

  if (!emp) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  router.db.get('employees').remove({ id }).write();

  res.json({ message: 'Deleted successfully' });
});


// fallback router (keep last)
server.use(router);

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
