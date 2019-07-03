import React from 'react'
import config from '../config'

const LastPurchases = props => {
    const purchaseList = props.lastPurchases.slice(0, config.LAST_PURCHASE_LIMIT).map(item => {
        const avatarLink = `https://minotar.net/helm/${item.form.nickname}/100.png`
        return (
            <div className="list-group-item" key={item.time}>
                <div className="notification notification-flush bg-200" href="">
                    <div className="notification-avatar">
                    <div className="avatar avatar-2xl mr-3">
                        <img src={avatarLink} alt={item.form.nickname} />
                    </div>
                    </div>
                    <div className="notification-body">
                    <p className="mb-1"><strong>{item.form.nickname}</strong></p>
                    <span className="notification-time">{item.package}</span>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="card card-notification shadow-none">
            <div className="card-header">
                <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                    <h6 className="card-header-title mb-0">Pēdējie pirkumi</h6>
                </div>
                </div>
            </div>
            <div className="list-group list-group-flush font-weight-normal fs--1">
                {purchaseList}
            </div>
        </div>
    )
}

export default LastPurchases