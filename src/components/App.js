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
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "https://loangraphs.activehosted.com/f/embed.php?id=3";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const { Title } = Typography;

  // Inputs
  const [mpi, setMpi] = useState(1000); // Monthly Pretax Income // Number
  const [mbeu, setMbeu] = useState(200); // Monthly bills excluding utilities // Number
  const [apt, setApt] = useState(1000); // Annual Property Taxes/Insurance // Number
  const [mi, setMi] = useState(0.0085); // MI Rate //  Number
  const [interest, setInterest] = useState(0.035); // Interest rate // Number
  const [tom, setTom] = useState(30);
  const [frontDti, setFrontDti] = useState(0.28);
  const [backDti, setBackDti] = useState(0.41); //  Dropdown for 49.99% or 41% or 56.99%

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
            <Select
              size="large"
              defaultValue={0.85}
              style={{ width: 88 }}
              onChange={handleMI}
            >
              <Option value={0.125}>0.125</Option>
              <Option value={0.35}>0.35 USDA</Option>
              <Option value={0.5}>0.50</Option>
              <Option value={0.85}>0.85 FHA</Option>
              <Option value={1.0}>1.0</Option>
            </Select>
          </Form.Item>

          <Form.Item className="result" {...formItemLayout}>
            <Statistic
              title="Final Loan"
              value={formatter.format(getFinalLoan())}
            />
          </Form.Item>

          {/* <Form.Item>
          <div className="_form_3"></div>
          </Form.Item> */}
        </Form>
        <Form.Item>
          <form
            method="POST"
            action="https://loangraphs.activehosted.com/proc.php"
            id="_form_3_"
            className="_form _form_3 _inline-form  _dark"
            noValidate
          >
            <input type="hidden" name="u" value="3" />
            <input type="hidden" name="f" value="3" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <div className="_form-content">
              <div className="_form_element _x03902238 _full_width _clear">
                <div className="_html-code">
                  <p>Close More Loans. Sign up for a Demo of LoanGraphs.</p>
                </div>
              </div>
              <div className="_form_element _x92094134 _full_width ">
                <label className="_form-label"></label>
                <div className="_field-wrapper">
                  <input
                    type="text"
                    name="email"
                    placeholder="Type your email"
                    required
                  />
                </div>
              </div>
              <div className="_button-wrapper _full_width">
                <button id="_form_3_submit" className="_submit" type="submit">
                  Submit
                </button>
              </div>
              <div className="_clear-element"></div>
            </div>
            <div className="_form-thank-you" style={{ display: "none" }}></div>
          </form>
        </Form.Item>
      </div>
    </>
  );
};

export default App;
