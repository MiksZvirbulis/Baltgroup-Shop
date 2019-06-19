import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import config from '../config'

import { Input } from './Input'
import { isValid } from '../utils/isValid'

import { PayPalButton } from 'react-paypal-button'

const groupTypes = [
    {
        value: 1,
        price: 1.15,
        display: "Donator (12 dienas)",
        length: 12
    },
    {
        value: 2,
        price: 2.20,
        display: "Donator (24 dienas)",
        length: 24
    },
    {
        value: 3,
        price: 1.65,
        display: "Ultimate (12 dienas)",
        length: 12
    }
]

const initialState = {
    formData: {
        price: {
            attr: {
                type: "select",
                placeholder: "Grupa un tās termiņš",
            },
            options: [
                ...groupTypes
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        },
        code: {
            attr: {
                type: "hidden"
            },
            value: "",
            valid: { isValid: null, messages: [] }
        }
    },
    message: null,
    payment: null,
    formValid: false,
    paymentInterval: null
}

class MCGroup extends React.Component {
    state = {
        ...initialState
    }

    handleSMS() {
        this.props.getSMSKey(this.state.formData.price.value)
        clearInterval(this.state.paymentInterval)
        this.setState({ payment: "sms", paymentInterval: setInterval(() => this.props.checkSMSKey("B" + this.props.smsKey), config.CHECK_SMS_KEY_INTERVAL * 1000) })
    }

    handlePayPal() {
        this.setState({ payment: "paypal" })
    }

    handleUnlockCode() {
        if (this.state.paymentInterval !== false) {
            clearInterval(this.state.paymentInterval)
            const newCodeInput = {
                ...this.state.formData.code,
                attr: {
                    placeholder: "Saņemtais kods",
                    type: "text"
                },
                value: this.props.unlockCode,
                valid: { isValid: true, messages: [] }
            }
            this.setState({
                formData: {
                    ...this.state.formData,
                    code: newCodeInput,
                    price: { ...this.state.formData.price, disabled: true }
                },
                paymentInterval: false,
                payment: null
            }, this.handleChange({ id: "code", ...newCodeInput }, this.props.unlockCode))
        }
    }

    handlePayment() {
        this.props.checkUnlockCode({
            userId: this.props.shop.id,
            price: this.state.formData.price.value,
            unlockCode: this.state.formData.code.value
        }).then(() => {
            if (this.props.unlockCodePaid === true) {
                this.handleDonate()
            }
        })
    }

    resetForm(message = null) {
        const newState = { ...initialState, message }
        this.setState(newState)
    }

    handleDonate() {
        /*this.props.sendSuccessData("mc_group", {
            name: this.props.playerName,
            groupType: this.state.formData.price.value,
            unlockCode: this.props.unlockCode
        })*/
        this.props.resetUnlockCode()
        this.resetForm("Paldies par ziedojumu!")
    }

    componentWillReceiveProps() {
        if (this.props.unlockCode !== null) {
            this.handleUnlockCode()
        }
    }

    handleChange(input, newValue) {
        const currentForm = this.state.formData
        const currentInput = this.state.formData[input.id]
        if (input.id === "price") {
            newValue = Number(groupTypes.find(item => item.value === Number(newValue)).price)
            if (this.state.payment === "sms") {
                this.props.getSMSKey(newValue)
            }
        }
        const validation = input.rules ? isValid(newValue, input.rules) : { isValid: true, messages: [] }
        let formValid = true
        for (let formInput in this.state.formData) {
            if (formInput === input.id) {
                formValid = validation.isValid && formValid
            } else {
                formValid = this.state.formData[formInput].valid.isValid && formValid
            }
        }
        this.setState({ formData: {
            ...currentForm,
            [input.id]: {
                ...currentInput,
                value: newValue,
                valid: {
                    isValid: validation.isValid,
                    messages: validation.messages
                }
            },
        },
        formValid
        })
    }

    render() {
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        return (
            <>
                <h3>Ziedot</h3>
                {this.state.message ? (
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                ) : null}
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event.target.value)} key={index} {...input} /> )}
                    {(this.state.payment === "sms" && this.props.smsKey !== null) ?
                    <div className="alert alert-primary" role="alert">
                        {this.props.smsKey === null ? "..." : `Sūti SMS ${this.props.shop.smskey} B${this.props.smsKey} uz numuru 1881.`}<br />
                        <small>Maksa ({this.state.formData.price.value.toFixed(2)} EUR) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                    </div>
                    : (
                        this.state.payment === "paypal" ?
                        <div className="alert alert-primary" role="alert">
                            <PayPalButton
                                env='production'
                                sandboxID='6b98601746'
                                amount={this.state.formData.price.value.toFixed(2)}
                                currency='EUR'
                                onPaymentStart={() => console.log('payment started')}
                                onPaymentSuccess={(res) => this.handleDonate() }
                                onPaymentError={(msg) => console.log('payment error', msg)}
                                onShippingChange={(data) => {
                                    console.log('onShippingChange', data)
                                    return 0
                                }}
                            />
                            <small>Maksa ({this.state.formData.price.value.toFixed(2)} EUR) tiks atrēķināta no izvēlētā PayPal konta.</small>
                        </div>
                        : ""
                    )
                    }
                    {this.state.formData.price.value !== 0 ?
                    (
                        <>
                        {this.state.formData.code.value ?
                            <button className="btn btn-primary" type="button" onClick={() => this.handlePayment()} disabled={this.state.formValid ? null : "disabled"}>Apstiprināt</button>
                        :
                            (
                                <>
                                    <button className="btn btn-primary" type="button" onClick={() => this.handlePayPal()} disabled={this.state.payment === "paypal" ? "disabled" : null}>PayPal</button>
                                    <button className="btn btn-primary" type="button" onClick={() => this.handleSMS()} disabled={this.state.payment === "sms" ? "disabled" : null}>SMS</button>
                                </>
                            )
                        }
                        </>
                    ) : null}
                    
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        smsKey: state.payment.smsKey,
        playerName: state.shop.playerName,
        unlockCode: state.payment.unlockCode,
        unlockCodePaid: state.payment.unlockCodePaid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSMSKey: price => dispatch(actions.getSMSKey(price)),
        checkSMSKey: SMSKey => dispatch(actions.checkSMSKey(SMSKey)),
        checkUnlockCode: paymentData => dispatch(actions.checkUnlockCode(paymentData)),
        resetUnlockCode: () => dispatch(actions.resetUnlockCode()),
        sendSuccessData: (type, donate) => dispatch(actions.sendSuccessData(type, donate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MCGroup)