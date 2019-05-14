import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { Input } from './Input'

class Donate extends React.Component {
    state = {
        formData: {
            comment: {
                attr: {
                    type: "text",
                    placeholder: "Tavs komentārs"
                },
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 75
                }
            },
            price: {
                attr: {
                    type: "select",
                    placeholder: "Ziedojuma cena",
                },
                options: [
                    { value: 1, display: '1.00 EUR' },
                    { value: 1.5, display: '1.50 EUR' },
                    { value: 2.0, display: '2.00 EUR' }
                ],
                value: 0,
                valid: true
            },
            code: {
                attr: {
                    type: "hidden",
                    placeholder: "Saņemtais kods"
                },
                value: "",
                valid: true
            }
        },
        payment: null,
        formValid: false,
        paymentInterval: null
    }

    checkKeyInterval() {
        this.setState({ paymentInterval: setInterval(() => this.props.checkSMSKey("B" + this.props.smsKey), 5000) })
    }

    handleSMS() {
        this.props.getSMSKey(this.state.formData.price.value)
        this.setState({ payment: "sms"})
        this.checkKeyInterval()
    }

    handlePayPal() {
        this.setState({ payment: "paypal" })
    }

    handleDonate() {
        console.log("Handling donation...")
    }

    handleChange(input, event) {
        const currentForm = this.state.formData
        const currentInput = this.state.formData[input.id]
        let newValue = event.target.value
        if (input.id === "price") {
            newValue = Number(newValue)
            if (this.state.payment === "sms") {
                this.props.getSMSKey(newValue)
            }
        }
        this.setState({ formData: {
            ...currentForm,
            [input.id]: {
                ...currentInput,
                value: newValue
            }
        }
        })
    }

    render() {
        if (this.props.smsKeyPaid === true) {
            clearInterval(this.state.paymentInterval)
        }
        
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        return (
            <>
                <h3>Ziedot</h3>
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event)} key={index} {...input} /> )}
                    {(this.state.payment === "sms" && this.props.smsKey !== null) ?
                    <div className="alert alert-primary" role="alert">
                        {this.props.smsKey === null ? "Loading..." : `Sūti SMS ${this.props.shop.smskey} B${this.props.smsKey} uz numuru 1881.`}<br />
                        <small>Maksa ({this.state.formData.price.value.toFixed(2)} EUR) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                    </div>
                    : (
                        this.state.payment === "paypal" ? 
                        <div className="alert alert-primary" role="alert">
                            PAYPAL POGA<br />
                            <small>Maksa ({this.state.formData.price.value.toFixed(2)} EUR) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                        </div>
                        : ""
                    )
                    }
                    {this.state.formData.price.value !== 0 ?
                    (
                        <>
                        <button className="btn btn-primary" type="button" onClick={() => this.handlePayPal()} disabled={this.state.payment === "paypal" ? "disabled" : null}>PayPal</button>
                        <button className="btn btn-primary" type="button" onClick={() => this.handleSMS()} disabled={this.state.payment === "sms" ? "disabled" : null}>SMS</button>
                        {this.props.smsKeyPaid === true ?
                            <button className="btn btn-primary" type="button" onClick={() => this.handleDonate()}>Apstiprināt</button>
                        : null}
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
        smsKey: state.shop.smsKey,
        smsKeyPaid: state.shop.smsKeyPaid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSMSKey: price => dispatch(actions.getSMSKey(price)),
        checkSMSKey: SMSKey => dispatch(actions.checkSMSKey(SMSKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate)