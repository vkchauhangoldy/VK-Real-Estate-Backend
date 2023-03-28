const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const basicInfoSchema = new Schema({
  property_type: { type: String },
  negotiable: { type: String },
  price: { type: Number },
  ownership: { type: String },
  property_age: { type: String },
  property_approved: { type: String },
  property_description: { type: String },
});

const propertyDetailSchema = new Schema({
  length: { type: Number },
  breadth: { type: Number },
  total_area: { type: Number },
  area_unit: { type: String },
  number_of_bhk: { type: String },
  number_of_floor: { type: String },
  attached: { type: String },
  western_toilet: { type: String },
  furnished: { type: String },
  car_parking: { type: String },
  lift: { type: String },
  electricity: { type: String },
  facing: { type: String },
});

const generalInfoSchema = new Schema({
  name: { type: String },
  mobile: { type: Number },
  posted_by: { type: String },
  sales_type: { type: String },
  featured_package: { type: Number },
  PPD_package: { type: Number },
  imageURL: { type: String },
});

const locationInfoSchema = new Schema({
  email: { type: String },
  city: { type: String },
  area: { type: String },
  pincode: { type: String },
  address: { type: String },
  landmark: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

const basicInfoDataSchema = {
  tempId: { type: String },
  basic_info: { type: basicInfoSchema },
};
const propertyDetailDataSchema = {
  tempId: { type: String },
  property_detail: { type: propertyDetailSchema },
};
const generalInfoDataSchema = {
  tempId: { type: String },
  general_info: { type: generalInfoSchema },
};

const propertySchema = new Schema(
  {
    username: { type: String },
    userID: { type: String },
    PPD_ID: { type: String },
    basic_info: { type: basicInfoSchema },
    property_detail: { type: propertyDetailSchema },
    general_info: { type: generalInfoSchema },
    location_info: { type: locationInfoSchema },
    date_of_expiry: { type: String },
  },
  { timestamps: true }
);

const BasicInfoModel = mongoose.model("BasicInfo", basicInfoDataSchema);
const PropertyDetailModel = mongoose.model(
  "PropertyDetail",
  propertyDetailDataSchema
);
const GeneralInfoModel = mongoose.model("GeneralInfo", generalInfoDataSchema);
const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = {
  PropertyModel,
  BasicInfoModel,
  PropertyDetailModel,
  GeneralInfoModel,
};
