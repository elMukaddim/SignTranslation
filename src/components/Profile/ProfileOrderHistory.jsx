import ProfileOrderHistoryItem from "./ProfileOrderHistoryItem"

const ProfileOrderHistory = ({ orders }) => {
    const orderList = orders.map(
        (order, index) => <ProfileOrderHistoryItem key={index + '-' + order} order={order} />)
    return (
        <section>
        </section>
    )
}

export default ProfileOrderHistory 