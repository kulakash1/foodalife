import {
  Input,
  Space,
  Dropdown,
  Button,
  Checkbox,
  Radio,
  message,
  TimePicker,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

const { Search } = Input;

function App() {
  const [foodData, setFoodData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    googleAddress: "",
    mobileNumber: "",
    email: "",
    startTime: null,
    endTime: null,
    daysClosed: [],
    fooDItems: [
      {
        dishName: "",
        dishPrice: "",
        type: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const validate = () => {
    const newErrors = {};
    if (!foodData.restaurantName.trim())
      newErrors.restaurantName = "Restaurant Name is required";
    if (!foodData.restaurantAddress.trim())
      newErrors.restaurantAddress = "Restaurant Address is required";
    if (!foodData.googleAddress.trim())
      newErrors.googleAddress = "Google Address is required";
    if (!foodData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile Number is required";
    if (!foodData.email.trim()) newErrors.email = "Email is required";
    if (!foodData.startTime) newErrors.startTime = "Opening Time is required";
    if (!foodData.endTime) newErrors.endTime = "Closing Time is required";
    // if (!foodData.daysClosed.length)
    //   newErrors.daysClosed = "At least one closing day is required";
    foodData.fooDItems.forEach((item, index) => {
      if (!item.dishName.trim())
        newErrors[`dishName_${index}`] = "Dish Name is required";
      if (!item.dishPrice.trim())
        newErrors[`dishPrice_${index}`] = "Dish Price is required";
      if (item.type === "")
        newErrors[`type_${index}`] = "Dish Type is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (day, checked) => {
    setFoodData((prevState) => {
      const newDaysClosed = checked
        ? [...prevState.daysClosed, day]
        : prevState.daysClosed.filter((item) => item !== day);
      return { ...prevState, daysClosed: newDaysClosed };
    });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      message.error("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post("https://serverfoodalife.onrender.com/", foodData);
      // const response = await axios.post("http://localhost:3001/", foodData);
      console.log(response);
      message.success("Form submitted successfully");
    } catch (error) {
      console.error(error);
      message.error("Form submission failed");
    }
  };

  return (
    <div className="p-12 flex flex-col gap-3">
      <div className="flex-col">
        <span> Restaurant Name</span>
        <Input
          size="small"
          placeholder="Enter restaurant name"
          value={foodData.restaurantName}
          onChange={(e) =>
            setFoodData({ ...foodData, restaurantName: e.target.value })
          }
        />
        {errors.restaurantName && (
          <span className="text-red-500">{errors.restaurantName}</span>
        )}
      </div>
      <div className="flex-col">
        <span> Restaurant Address</span>
        <Input
          size="small"
          placeholder="Enter restaurant address"
          value={foodData.restaurantAddress}
          onChange={(e) =>
            setFoodData({ ...foodData, restaurantAddress: e.target.value })
          }
        />
        {errors.restaurantAddress && (
          <span className="text-red-500">{errors.restaurantAddress}</span>
        )}
      </div>
      <div className="flex-col">
        <span> Restaurant Google Address</span>
        <Input
          size="small"
          placeholder="Enter google address"
          value={foodData.googleAddress}
          onChange={(e) =>
            setFoodData({ ...foodData, googleAddress: e.target.value })
          }
        />
        {errors.googleAddress && (
          <span className="text-red-500">{errors.googleAddress}</span>
        )}
      </div>
      <div className="flex-col">
        <span> Mobile Number</span>
        <Input
          type="number"
          size="small"
          placeholder="Enter mobile number"
          value={foodData.mobileNumber}
          onChange={(e) =>
            setFoodData({ ...foodData, mobileNumber: e.target.value })
          }
        />
        {errors.mobileNumber && (
          <span className="text-red-500">{errors.mobileNumber}</span>
        )}
      </div>
      <div className="flex-col">
        <span> Email</span>
        <Input
          size="small"
          placeholder="Enter email"
          value={foodData.email}
          onChange={(e) => setFoodData({ ...foodData, email: e.target.value })}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div className="flex gap-2">
        <div className="flex-col">
          <span> Opening Time</span>
          <TimePicker
          use12Hours
            value={foodData.startTime}
            onChange={(value) => setFoodData({ ...foodData, startTime: value })}
            className="ml-2 mr-4"
          />
          {errors.startTime && (
            <span className="text-red-500">{errors.startTime}</span>
          )}
        </div>
        <div className="flex-col">
          <span> Closing Time</span>
          <TimePicker
          use12Hours
            value={foodData.endTime}
            onChange={(value) => setFoodData({ ...foodData, endTime: value })}
            className="ml-2 mr-4"
          />
          {errors.endTime && (
            <span className="text-red-500">{errors.endTime}</span>
          )}
        </div>
      </div>
      <div className="flex-col">
        <span> Days Closed</span>
        <div className="flex gap-2">
          {daysOfWeek.map((day, index) => (
            <div key={index}>
              <Checkbox
                id={`day-${index}`}
                name={day}
                value={day}
                checked={foodData.daysClosed.includes(day)}
                onChange={(e) => handleChange(day, e.target.checked)}
              >
                {day}
              </Checkbox>
            </div>
          ))}
        </div>
        {errors.daysClosed && (
          <span className="text-red-500">{errors.daysClosed}</span>
        )}
      </div>
      <span> Food Items</span>
      {foodData.fooDItems.map((food, index) => (
        <div key={index} className="flex-col">
          <div className="flex gap-2 items-center">
            <div className="flex-col">
              <span> Dish Name</span>
              <Input
                size="small"
                placeholder="Enter dish name"
                value={food.dishName}
                onChange={(e) => {
                  setFoodData((prevState) => {
                    const updatedItems = [...prevState.fooDItems];
                    updatedItems[index].dishName = e.target.value;
                    return { ...prevState, fooDItems: updatedItems };
                  });
                }}
              />
              {errors[`dishName_${index}`] && (
                <span className="text-red-500">
                  {errors[`dishName_${index}`]}
                </span>
              )}
            </div>
            <div className="flex-col">
              <span> Dish Price</span>
              <Input
                size="small"
                placeholder="Enter dish price"
                value={food.dishPrice}
                onChange={(e) => {
                  setFoodData((prevState) => {
                    const updatedItems = [...prevState.fooDItems];
                    updatedItems[index].dishPrice = e.target.value;
                    return { ...prevState, fooDItems: updatedItems };
                  });
                }}
              />
              {errors[`dishPrice_${index}`] && (
                <span className="text-red-500">
                  {errors[`dishPrice_${index}`]}
                </span>
              )}
            </div>
            {foodData.fooDItems.length > 1 && (
              <Button
                type="primary"
                size="small"
                className="mt-6"
                onClick={() => {
                  setFoodData((prevState) => {
                    const updatedItems = prevState.fooDItems.filter(
                      (_, i) => i !== index
                    );
                    return { ...prevState, fooDItems: updatedItems };
                  });
                }}
              >
                Remove
              </Button>
            )}
          </div>
          <div className="flex-col mt-2">
            <span className="mr-2"> Type</span>
            <Radio.Group
              onChange={(e) => {
                setFoodData((prevState) => {
                  const updatedItems = [...prevState.fooDItems];
                  updatedItems[index].type = e.target.value;
                  return { ...prevState, fooDItems: updatedItems };
                });
              }}
              value={food.type}
            >
              <Radio value={0}>Veg</Radio>
              <Radio value={1}>Non-Veg</Radio>
            </Radio.Group>
            {errors[`type_${index}`] && (
              <span className="text-red-500">{errors[`type_${index}`]}</span>
            )}
          </div>
          {index === foodData.fooDItems.length - 1 && (
            <Button
              type="primary"
              size="small"
              className="mt-6"
              onClick={() => {
                setFoodData((prevState) => {
                  return {
                    ...prevState,
                    fooDItems: [
                      ...prevState.fooDItems,
                      { dishName: "", dishPrice: "", type: "" },
                    ],
                  };
                });
              }}
            >
              Add More
            </Button>
          )}
        </div>
      ))}
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default App;
