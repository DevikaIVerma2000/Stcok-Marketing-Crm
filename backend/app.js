require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use( cors({ origin: process.env.FRONTEND_URL , credentials: true, }));
app.use(express.json());
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  },
});



// Provide CSRF token to frontend
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Database connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Database is connected'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
const analystRoutes = require('./routes/analystRoutes');
const accessRequestRoutes = require('./routes/accessRequestRoutes');
const authorizedDevicesRoutes = require('./routes/authorizedDevicesRoutes');
const customerRoute = require('./routes/customerRoutes');
const customerBranchesRoute = require('./routes/customerBranchesRoutes');
const branchRoute = require('./routes/branchesRoute');
const customerPackagesRoutes = require('./routes/customerPackagesRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const packageUserRoutes = require('./routes/packageUserRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const attendanceLegendRoutes = require('./routes/attendanceLegendRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const callHistoryRoutes = require('./routes/callHistoryRoutes');
const callStatusesRoutes = require('./routes/callStatusesRoutes');
const complianceRecordsRoutes = require('./routes/complianceRecordsRoutes');
const companyDetailsRoutes = require('./routes/companyDetailsRoutes');
const departmentRoutes = require('./routes/departmentsRoutes');
const designationsRoutes = require('./routes/designationsRoutes');
const employeeSalesRoutes = require('./routes/employeeSalesRoutes');
const employmentDetailsRoutes = require('./routes/employmentDetailsRoutes');
const invoiceRoutes = require('./routes/invoicesRoutes');
const leadsRoutes = require('./routes/leadRoutes');
const leadSourceRoutes = require('./routes/leadSourceRoutes');
const MarketingAgencyRoutes = require('./routes/marketingAgenciesRoutes');
const migrationRoutes = require('./routes/migrationsRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');
const paymentModeRoutes = require('./routes/paymentModesRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const salesTargetRoutes = require('./routes/salesTargetRoutes');
const scheduleCallbackRoutes = require('./routes/scheduleCallbacksRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const teamLeaderRoutes = require('./routes/teamLeaderRoutes');
const teamMembersRoutes = require('./routes/teamMembersRoutes');
const userAuthRoutes = require('./routes/userAuthRoute');
const userRoutes = require('./routes/userRoute');
const userAccessLogsRoutes = require('./routes/userAccessLogsRoutes');
const { requireAuth } = require('./middlewares/userMiddleware');

// Define routes
app.use('/api', analystRoutes);
app.use('/api', accessRequestRoutes);
app.use('/api/devices', authorizedDevicesRoutes);
app.use('/api', customerRoute);
app.use('/api', customerBranchesRoute);
app.use('/branches', branchRoute);
app.use('/api', customerPackagesRoutes);
app.use('/api', packagesRoutes);
app.use('/api', packageUserRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', attendanceLegendRoutes);
app.use('/api', shiftRoutes);
app.use('/api', callHistoryRoutes);
app.use('/api', callStatusesRoutes);
app.use('/api', companyDetailsRoutes);
app.use('/api', complianceRecordsRoutes);
app.use('/api', departmentRoutes);
app.use('/api', designationsRoutes);
app.use('/api', employeeSalesRoutes);
app.use('/api', employmentDetailsRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', leadsRoutes);
app.use('/api', leadSourceRoutes);
app.use('/api', MarketingAgencyRoutes);
app.use('/api', migrationRoutes);
app.use('/api', paymentRoutes);
app.use('/api', paymentModeRoutes);
app.use('/api', roleRoutes);
app.use('/api', salesTargetRoutes);
app.use('/api', scheduleCallbackRoutes);
app.use('/api', teamsRoutes);
app.use('/api', teamLeaderRoutes);
app.use('/api', teamMembersRoutes);
app.use('/api', userAuthRoutes);
app.use('/api', userRoutes);
app.use('/api/access-logs', userAccessLogsRoutes);

app.use('/protectedRoute', requireAuth, (req, res) => {
  res.send('This is a protected route');
});

// Error handling middleware
const { errorHandler } = require('./middlewares/userMiddleware');
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));