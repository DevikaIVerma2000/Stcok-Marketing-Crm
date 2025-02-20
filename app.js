const express = require('express');
const mongoose = require('mongoose');
const app = express();


const analystRoutes = require('./routes/analystRoutes');
const accessRequestRoutes = require('./routes/accessRequestRoutes');
const authorizedDevicesRoutes = require('./routes/authorizedDevicesRoutes');
const roleRoute = require('./routes/roleRoute');
const permissionRoute = require('./routes/permissionRoutes');
const rolePermissionRoute = require('./routes/rolePermissionRoute');
const customerRoute = require('./routes/customerRoutes');
const customerBranchesRoute = require('./routes/customerBranchesRoutes');
const branchRoute = require('./routes/branchesRoute');
const customerPackagesRoutes = require('./routes/customerPackagesRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const packageUserRoutes = require('./routes/packageUserRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const attendanceLegendRoutes = require('./routes/attendanceLegendRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const callHistoryRoutes  = require('./routes/callHistoryRoutes');
const callStatusesRoutes  = require('./routes/callStatusesRoutes');
const companyDetailsRoutes = require('./routes/companyDetailsRoutes');
const departmentRoutes  = require('./routes/departmentsRoutes');
const employeeSalesRoutes  = require('./routes/employeeSalesRoutes');
const employmentDetailsRoutes  = require('./routes/employmentDetailsRoutes');
const invoiceRoutes  = require('./routes/invoicesRoutes');
const leadsRoutes  = require('./routes/leadRoutes');
const leadSourceRoutes  = require('./routes/leadSourceRoutes');
const MarketingAgencyRoutes  = require('./routes/marketingAgenciesRoutes');
const migrationRoutes = require('./routes/migrationsRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');
const paymentModeRoutes = require('./routes/paymentModesRoutes');
const salesTargetRoutes = require('./routes/salesTargetRoutes');
const scheduleCallbackRoutes = require('./routes/scheduleCallbacksRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const teamLeaderRoutes = require('./routes/teamLeaderRoutes');
const teamMembersRoutes = require('./routes/teamMembersRoutes');
const userAuthRoutes = require('./routes/userAuthRoute');
const userRoutes = require('./routes/userRoute');
const userAccessLogsRoutes = require('./routes/userAccessLogsRoutes');

const { requireAuth, errorHandler } = require('./middlewares/userMiddleware');
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/stockMarketCrm')
    .then(() => {
        console.log('Database is connected');
    })
    .catch(() => {
        console.log('Database is not connected');
    });

app.use(errorHandler);
app.use('/api', analystRoutes);
app.use('/api', accessRequestRoutes);
app.use('/api/devices', authorizedDevicesRoutes);
app.use('/role',roleRoute);
app.use('/permission',permissionRoute);
app.use('/rolePermission', rolePermissionRoute);
app.use('/api',customerRoute);
app.use('/api', customerBranchesRoute);
app.use('/branches', branchRoute);
app.use('/api', customerPackagesRoutes);
app.use('/api', packagesRoutes);
app.use('/api', packageUserRoutes);
app.use('/api', attendanceRoutes);
app.use('/attendanceLegend', attendanceLegendRoutes);
app.use('/api', shiftRoutes);
app.use('/callHistory', callHistoryRoutes);
app.use('/callStatuses', callStatusesRoutes);
app.use('/companyDetails', companyDetailsRoutes);
app.use('/api', departmentRoutes);
app.use('/employeeSales', employeeSalesRoutes);
app.use('/employmentDetails', employmentDetailsRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/leads', leadsRoutes);
app.use('/leadSources', leadSourceRoutes);
app.use('/marketingAgencies', MarketingAgencyRoutes);
app.use('/migrations', migrationRoutes);
app.use('/payments', paymentRoutes);
app.use('/paymentModes', paymentModeRoutes);
app.use('/salesTargets', salesTargetRoutes);
app.use('/scheduleCallbacks', scheduleCallbackRoutes);
app.use('/api', teamsRoutes);
app.use('/api', teamLeaderRoutes);
app.use('/api', teamMembersRoutes);
app.use('/auth', userAuthRoutes);
app.use('/api', userRoutes);
app.use('/api/access-logs', userAccessLogsRoutes);

app.use('/protectedRoute', requireAuth, (req, res) => {
    res.send('This is a protected route');
});

app.get('/', (req, res) => res.send('Hello World!'));

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
