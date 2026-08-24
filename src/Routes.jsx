import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCustomer from "./Pages/AddCustomer";
import AddNewUser from "./Pages/AddNewUser";
import ChangePassword from "./Pages/ChangePassword";
import CreateGroupPermission from "./Pages/CreateGroupPermission";
import CustomerList from "./Pages/CustomerList";
import Home from "./Pages/Home";
import ListGroupPermission from "./Pages/ListGroupPermission";
import LoanApplicants from "./Pages/LoanApplicants";
import LoanApplication from "./Pages/LoanApplication";
import LoanDurations from "./Pages/LoanDurations";
import Loans from "./Pages/Loans";
import RepaymentDefaulters from "./Pages/RepaymentDefaulters";
import Savings from "./Pages/Savings";
import SavingsList from "./Pages/SavingsList";
import Users from "./Pages/Users";
import UsersList from "./Pages/UsersList";
import CustomerProfile from "./Pages/CustomerProfile";
import AddDepositWithdrawal from "./Pages/AddDepositWithdrawal";
import LoanApplicantsDetails from "./Pages/LoanApplicantsDetails";
import CustomerAvailableBalance from "./Pages/CustomerAvailableBalance";
import UsersDetails from "./Pages/UsersDetails";
import RepayLoan from "./Pages/RepayLoan";
import TransactionsByCash from "./Pages/TransactionsByCash";
import AllTransactions from "./Pages/AllTransactions";
import TransactionsByTransfer from "./Pages/TransactionsByTransfer";
import CustomerDetails from "./Pages/CustomerDetails";
import LoanInterests from "./Pages/LoanInterests";
import Expenses from "./Pages/Expenses";
import AddExpense from "./Pages/AddExpense";
import EditLoan from "./Pages/EditLoan";
import EditCustomer from "./Pages/EditCustomer";
import Updateloan from "./Pages/Updateloan";
import Withdrawals from "./Pages/Withdrawals";
import EditUser from "./Pages/EditUser";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers-list" element={<CustomerList />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/customer-profile/:id" element={<CustomerProfile />} />
        <Route path="/savings-list" element={<SavingsList />} />
        <Route path="/loans" element={<Loans />} />
        <Route
          path="/add-contribution/:id"
          element={<AddDepositWithdrawal />}
        />
        <Route path="/repay-loan/:id" element={<RepayLoan />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route
          path="/loan-applicants-details/:id"
          element={<LoanApplicantsDetails />}
        />
        <Route
          path="/customer-available-balance/:id"
          element={<CustomerAvailableBalance />}
        />
        <Route path="/user-details/:id" element={<UsersDetails />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/add-user" element={<AddNewUser />} />
        <Route path="/new-loan-applicant" element={<LoanApplication />} />
        <Route path="/loan-applicants" element={<LoanApplicants />} />
        <Route path="/repayment-defaulters" element={<RepaymentDefaulters />} />
        <Route
          path="/list-group-and-permissions"
          element={<ListGroupPermission />}
        />
        <Route
          path="/create-group-and-permissions"
          element={<CreateGroupPermission />}
        />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/loan-duration" element={<LoanDurations />} />
        <Route path="/transactions-by-cash" element={<TransactionsByCash />} />
        <Route
          path="/transactions-by-transfer"
          element={<TransactionsByTransfer />}
        />
        <Route path="/transactions" element={<AllTransactions />} />
        <Route path="/withdrawals" element={<Withdrawals />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/loan-interests" element={<LoanInterests />} />
        <Route path="/edit-loan/:id" element={<EditLoan />} />
        <Route path="/customer-details/:id" element={<CustomerDetails />} />
        <Route path="/edit-customer/:id" element={<EditCustomer />} />
        <Route path="/update-loan/:id" element={<Updateloan />} />
      </Routes>
    </>
  );
};

export default Routing;
