import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, InputNumber, Select, Statistic } from "antd";
import { List, Typography, Icon } from "antd";
import { formatter, getPV, getLoanPV } from "../../src/utils.js";
import "./App.scss";
import "./Form.scss";
import "antd/dist/antd.css";

const App = props => {
  // antd
  const [formLayout, setFormLayout] = useState("horizontal");
  const formItemLayout = {
    // labelCol: { span: 12 },
    // wrapperCol: { span: 12 }
  };

  const { Title } = Typography;

  // Inputs
  const [mpi, setMpi] = useState(1000); // Monthly Pretax Income // Number
  const [mbeu, setMbeu] = useState(200); // Monthly bills excluding utilities // Number
  const [apt, setApt] = useState(1000); // Annual Property Taxes/Insurance // Number
  const [mi, setMi] = useState(0.0085); // MI Rate //  Number
  const [interest, setInterest] = useState(0.035); // Interest rate // Number
  const [tom, setTom] = useState(30);
  const [term, setTerm] = useState(30); // Dropdown for 10 15 20 30
  const [frontDti, setFrontDti] = useState(0.28);
  const [backDti, setBackDti] = useState(0.41); //  Dropdown for 49.99% or 41% or 56.99%

  // Results
  const [maxMonthlyPayment, setMaxMonthlyPayment] = useState(0); // mpi * frontDTI
  const [monthlyPropertyTaxes, setMonthlyPropertyTaxes] = useState(0);
  const [maxMonthlyPaymentNoTaxes, setMaxMonthlyPaymentNoTaxes] = useState(0);
  const [maxBackendPayment, setMaxBackendPayment] = useState(0);
  const [
    maxBackendPaymentPercantage,
    setMaxBackendPaymentPercantage
  ] = useState(0);
  const [isPayment, setIsPayment] = useState(true);
  // Calculations

  // handleChanges
  const handleMPI = value => {
    setMpi(value);
  };
  const handleMBEU = value => {
    setMbeu(value);
  };
  const handleAPT = value => {
    setApt(value);
  };
  const handleMI = value => {
    setMi(value / 100);
  };
  const handleInterest = value => {
    setInterest(value / 100);
  };
  const handleTOM = value => {
    setTom(value);
  };

  const { Option } = Select;
  const handleTerm = value => {
    setTerm(value);
  };

  const handleFrontDti = value => {
    setFrontDti(parseFloat((value / 100).toFixed(4)));
  };
  const handleBackDti = value => {
    setBackDti(parseFloat((value / 100).toFixed(4)));
  };

  //get

  const getM1 = () => {
    return Math.min(mpi * frontDti);
  };
  const getM2 = () => {
    return backDti * mpi - mbeu;
  };
  const getM3 = () => {
    return getMaxMonthlyPayment() - apt / 12;
  };

  const getMaxMonthlyPayment = () => {
    return parseFloat(Math.min(getM1(), getM2()).toFixed(4));
  };
  const getLoanBasedOnPI = () => {
    return getPV(interest / 12, tom * 12, getM3());
  };

  const getMonthlyMI = () => {
    return (mi * getLoanBasedOnPI()) / 12;
  };

  const getFinalLoan = () => {
    return getPV(interest / 12, tom * 12, -getM3() + getMonthlyMI()) * -1;
  };
  /*
  const getMonthlyPropertyTaxes = () => {
    return parseFloat((apt / 12).toFixed(2));
  };
  const getMaxMonthlyPaymentNoTaxes = () => {
    return parseFloat(
      (getMaxMonthlyPayment() - getMonthlyPropertyTaxes()).toFixed(2)
    );
  };

  const getMaxBackendPayment = () => {
    return parseFloat((getMaxMonthlyPaymentNoTaxes() + mbeu).toFixed(2));
  };

  const getMaxBackendPaymentPercent = () => {
    const results = parseFloat((getMaxBackendPayment() / mpi).toFixed(4) * 100);
    return results;
  };

  const getMaxPaymentOrLoan = () => {
    const PV = getPV(mi / 12, term * 12, getMaxMonthlyPaymentNoTaxes());
    if (getMaxBackendPaymentPercent() < backDti * 100) {
      if (!isPayment) {
        setIsPayment(true);
      }
      return `Maximum payment: ${formatter.format(PV)}`;
    } else if (getMaxBackendPaymentPercent() > backDti * 100) {
      if (isPayment) {
        setIsPayment(false);
      }
      return `Maximum Loan: ${formatter.format(PV)}`;
    }
  };
*/
  return (
    <>
      <div className="container">
        <Title level={2}>
          <Icon type="calculator" theme="twoTone" /> Home Affordability
          Calculator
        </Title>
        <Form layout="vertical" className="form">
          <Form.Item label="Monthly income" {...formItemLayout}>
            <InputNumber
              size="large"
              defaultValue={1000}
              step={500}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleMPI}
            />
          </Form.Item>

          <Form.Item label="Front end DTI" {...formItemLayout}>
            <Select
              size="large"
              defaultValue="28%"
              style={{ width: 88 }}
              onChange={handleFrontDti}
            >
              <Option value={28}>28% USDA</Option>
              <Option value={40}>40% FHA Manual</Option>
              <Option value={46.99}>46.99% FHA A/E</Option>
              <Option value={49.99}>49.99% Conventional</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Monthly bills excluding utilities"
            {...formItemLayout}
          >
            <InputNumber
              size="large"
              defaultValue={200}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleMBEU}
            />
          </Form.Item>

          <Form.Item label="Back end DTI" {...formItemLayout}>
            <Select
              size="large"
              defaultValue="41%"
              style={{ width: 88 }}
              onChange={handleBackDti}
            >
              <Option value={41}>41% USDA</Option>
              <Option value={50}>50% FHA Manual</Option>
              <Option value={56.99}>56.99% FHA A/E</Option>
              <Option value={60}>60%</Option>
            </Select>
          </Form.Item>

          <Form.Item className="result" {...formItemLayout}>
            <Statistic
              title="Maximum Monthly Payment"
              value={formatter.format(getMaxMonthlyPayment())}
            />
          </Form.Item>

          <Form.Item
            label="Annual Property Taxes/Insurance"
            {...formItemLayout}
          >
            <InputNumber
              size="large"
              defaultValue={1000}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleAPT}
            />
          </Form.Item>

          <Form.Item label="Term of Mortgage (years):" {...formItemLayout}>
            <InputNumber
              size="large"
              defaultValue={30}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleTOM}
            />
          </Form.Item>

          <Form.Item label="Interest Rate" {...formItemLayout}>
            <InputNumber
              size="large"
              // Interest Rate
              defaultValue={3.5}
              step={0.125}
              formatter={value => `${value}%`}
              parser={value => value.replace("%", "")}
              onChange={handleInterest}
            />
          </Form.Item>

          <Form.Item label="MI Rate" {...formItemLayout}>
            <InputNumber
              size="large"
              // handleMI : MI Rate
              defaultValue={0.85}
              step={0.125}
              formatter={value => `${value}%`}
              parser={value => value.replace("%", "")}
              onChange={handleMI}
            />
          </Form.Item>

          <Form.Item className="result" {...formItemLayout}>
            <Statistic
              title="Final Loan"
              value={formatter.format(getFinalLoan())}
            />
          </Form.Item>

          {/* <Form.Item label="Term" {...formItemLayout}>
            <Select
              defaultValue={30}
              style={{ width: 88 }}
              onChange={handleTerm}
            >
              <Option value={10}>10</Option>
              <Option value={15}>15</Option>
              <Option value={20}>20</Option>
              <Option value={30}>30</Option>
            </Select>
          </Form.Item> */}
        </Form>

        {/*  
        <ul className="results">
          <li>
            Maximum Monthly Payment:{" "}
            <strong>{formatter.format(getMaxMonthlyPayment())}</strong>
          </li>
          <li>
            Monthly Property Taxes:{" "}
            <strong>{formatter.format(getMonthlyPropertyTaxes())}</strong>
          </li>
          <li>
            Max monthly payment minus taxes:{" "}
            <strong>{formatter.format(getMaxMonthlyPaymentNoTaxes())}</strong>
          </li>

          <li>
            Maxmimum Backend Payment:{" "}
            <strong>{formatter.format(getMaxBackendPayment())}</strong>
          </li>

          <li>
            Maximum backend payment percent :{" "}
            <strong>{getMaxBackendPaymentPercent()}%</strong>
          </li>
          <li className="result">{getMaxPaymentOrLoan()}</li>
        </ul>
        <div className="test">
          <p>
            Test 2: IF line 21 is GREATER than 11 then show result line as
            "Maximum loan" <strong>{backDti * mpi}</strong>
          </p>
          <p>
            <strong>{(backDti * mpi - apt / 12 - mbeu).toFixed(4)}</strong>{" "}
            subtract out property taxes and monthly bills
          </p>
          <p>
            If line 28 then calculate and show result as "Maximum loan" ::{" "}
            <strong>
              {formatter.format(
                getPV(
                  mi / 12,
                  term * 12,
                  (backDti * mpi - apt / 12 - mbeu).toFixed(4)
                )
              )}
            </strong>
          </p>
        </div> */}
      </div>
    </>
  );
};

export default App;
