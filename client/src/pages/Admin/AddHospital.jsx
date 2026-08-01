import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddHospital = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    latitude: "",
    longitude: "",

    totalBeds: "",
    availableBeds: "",

    specialties: "",

    rating: 4.5,

    ambulanceAvailable: false,
    emergencyAvailable: true,
    isVerified: false,
    isOpen24x7: true,

    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axios.post(
        "http://localhost:5000/api/hospitals",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Hospital Added Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Add Hospital
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Form fields will come here */}
          {/* Hospital Name */}
<div>
  <label className="block mb-2 font-semibold">Hospital Name</label>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Apollo Hospital"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Email */}
<div>
  <label className="block mb-2 font-semibold">Email</label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="hospital@gmail.com"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Phone */}
<div>
  <label className="block mb-2 font-semibold">Phone</label>
  <input
    type="text"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="9876543210"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Address */}
<div>
  <label className="block mb-2 font-semibold">Address</label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    placeholder="Hospital Address"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* City */}
<div>
  <label className="block mb-2 font-semibold">City</label>
  <input
    type="text"
    name="city"
    value={formData.city}
    onChange={handleChange}
    placeholder="Delhi"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* State */}
<div>
  <label className="block mb-2 font-semibold">State</label>
  <input
    type="text"
    name="state"
    value={formData.state}
    onChange={handleChange}
    placeholder="Delhi"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Pincode */}
<div>
  <label className="block mb-2 font-semibold">Pincode</label>
  <input
    type="text"
    name="pincode"
    value={formData.pincode}
    onChange={handleChange}
    placeholder="110001"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Latitude */}
<div>
  <label className="block mb-2 font-semibold">Latitude</label>
  <input
    type="number"
    step="any"
    name="latitude"
    value={formData.latitude}
    onChange={handleChange}
    placeholder="28.6139"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Longitude */}
<div>
  <label className="block mb-2 font-semibold">Longitude</label>
  <input
    type="number"
    step="any"
    name="longitude"
    value={formData.longitude}
    onChange={handleChange}
    placeholder="77.2090"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
    required
  />
</div>

{/* Total Beds */}
<div>
  <label className="block mb-2 font-semibold">Total Beds</label>
  <input
    type="number"
    name="totalBeds"
    value={formData.totalBeds}
    onChange={handleChange}
    placeholder="300"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
  />
</div>

{/* Available Beds */}
<div>
  <label className="block mb-2 font-semibold">Available Beds</label>
  <input
    type="number"
    name="availableBeds"
    value={formData.availableBeds}
    onChange={handleChange}
    placeholder="120"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
  />
</div>

{/* Rating */}
<div>
  <label className="block mb-2 font-semibold">Rating</label>
  <input
    type="number"
    step="0.1"
    min="0"
    max="5"
    name="rating"
    value={formData.rating}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
  />
</div>

{/* Specialties */}
<div>
  <label className="block mb-2 font-semibold">Specialties</label>
  <input
    type="text"
    name="specialties"
    value={formData.specialties}
    onChange={handleChange}
    placeholder="Cardiology, Neurology, Trauma"
    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
  />
</div>

<div className="md:col-span-2">
  <label className="block mb-2 font-semibold">
    Hospital Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="w-full border rounded-lg p-3"
  />
</div>

<div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="ambulanceAvailable"
      checked={formData.ambulanceAvailable}
      onChange={handleChange}
    />
    Ambulance
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="emergencyAvailable"
      checked={formData.emergencyAvailable}
      onChange={handleChange}
    />
    Emergency
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="isOpen24x7"
      checked={formData.isOpen24x7}
      onChange={handleChange}
    />
    Open 24×7
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="isVerified"
      checked={formData.isVerified}
      onChange={handleChange}
    />
    Verified
  </label>

</div>

<div className="md:col-span-2 flex justify-end mt-6">

  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
  >
    Add Hospital
  </button>

</div>

        </form>

      </div>
    </div>
  );
};

export default AddHospital;