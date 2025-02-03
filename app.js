const express = require('express');
const mongoose = require('mongoose');
const app = express();


const authRoute = require('./routes/userRoute');
const userDetailRoutes = require('./routes/userDetailRoute');
const roleRoute = require('./routes/roleRoute');
const permissionRoute = require('./routes/permissionRoutes')
const rolePermissionRoute = require('./routes/rolePermissionRoute')
const customerRoute = require('./routes/customerRoutes');
const customerBranchesRoute = require('./routes/customerBranchesRoutes');
const branchRoute = require('./routes/branchesRoute');
const customerPackagesRoutes = require('./routes/customerPackagesRoutes')
const packagesRoutes = require('./routes/packagesRoutes')
const packageUserRoutes = require('./routes/packageUserRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const attendanceLegendRoutes = require('./routes/attendanceLegendRoutes');
const shiftRoutes  = require('./routes/shiftRoutes');
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
const teamLeaderRoutes = require('./routes/teamLeaderRoutes');

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
app.use('/auth', authRoute);
app.use('/api', userDetailRoutes);
app.use('/role',roleRoute);
app.use('/permission',permissionRoute);
app.use('/rolePermission', rolePermissionRoute);
app.use('/customers',customerRoute);
app.use('/customerBranches', customerBranchesRoute);
app.use('/branches', branchRoute);
app.use('/customerPackages', customerPackagesRoutes);
app.use('/packages', packagesRoutes);
app.use('/packageUsers', packageUserRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/attendanceLegend', attendanceLegendRoutes);
app.use('/shift', shiftRoutes);
app.use('/callHistory', callHistoryRoutes);
app.use('/callStatuses', callStatusesRoutes);
app.use('/companyDetails', companyDetailsRoutes);
app.use('/departments', departmentRoutes);
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
app.use('/teamLeaders', teamLeaderRoutes);

app.use('/protectedRoute', requireAuth, (req, res) => {
    res.send('This is a protected route');
});


app.get('/', (req, res) => res.send('Hello World!'));

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
