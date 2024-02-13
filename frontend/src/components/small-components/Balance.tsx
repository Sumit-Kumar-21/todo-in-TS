function Balance({ value }) {
    return <div className="h-16 flex items-center pl-7 font-bold text-xl">
        <div>Your balance Rs. {value}</div>
    </div>;
}

export default Balance;