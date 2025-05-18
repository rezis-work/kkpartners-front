import { fetchAddresses } from '../api/address'
import type { Address } from '../api/address'

const AddressCard: React.FC<Address> = ({ city, street, phone, email }) => (
  <div>
    <h3 className="font-bold text-[23px] mt-[20px]">{city}</h3>
    <p className="mt-[30px] cursor-pointer">{street}</p>
    <p className="mt-[15px] cursor-pointer">{phone}</p>
    <p className="mt-[15px] cursor-pointer">{email}</p>
    <p className="mt-[15px] cursor-pointer">Working Hours: 07am to 5pm</p>
  </div>
)

export default AddressCard
