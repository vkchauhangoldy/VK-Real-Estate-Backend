const jwt = require("jsonwebtoken");
const SECRET_CODE = "asdfghjklkjhgfdsa";
const {
  PropertyModel,
  BasicInfoModel,
  PropertyDetailModel,
  GeneralInfoModel,
} = require("../model/property-schema");
const { randomFiveDigitInteger } = require("../utils/utils");

const getUserByToken = (token) => {
  return new Promise((res, rej) => {
    if (token) {
      let userDetail;
      try {
        userDetail = jwt.verify(token, SECRET_CODE);
        res(userDetail);
      } catch (error) {
        rej("Please enter a valid token!");
      }
    } else {
      rej("Token not found!");
    }
  });
};

exports.postBasicInfo = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    const hasProperty = await BasicInfoModel.find({
      tempId: { $eq: `${user.username + user.userID}-1` },
    });
    if (user) {
      try {
        const basicInfo = {
          property_type: req.body.property_type,
          negotiable: req.body.negotiable,
          price: req.body.price,
          ownership: req.body.ownership,
          property_age: req.body.property_age,
          property_approved: req.body.property_approved,
          property_description: req.body.property_description,
          bank_loan: req.body.bank_loan,
        };

        if (hasProperty.length !== 1) {
          const newPropertyInfo = await BasicInfoModel.create({
            basic_info: basicInfo,
            PPD_ID: `PPD${randomFiveDigitInteger()}`,
            tempId: `${user.username + user.userID}-1`,
          });
          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        } else {
          const newPropertyInfo = await BasicInfoModel.updateOne({
            basic_info: basicInfo,
            tempId: `${user.username + user.userID}-1`,
          });
          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.postPropertyDetail = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    const hasProperty = await PropertyDetailModel.find({
      tempId: { $eq: `${user.username + user.userID}-1` },
    });
    if (user) {
      try {
        const propertyDetail = {
          length: req.body.length,
          breadth: req.body.breadth,
          total_area: req.body.total_area,
          area_unit: req.body.area_unit,
          number_of_bhk: req.body.number_of_bhk,
          number_of_floor: req.body.number_of_floor,
          attached: req.body.attached,
          western_toilet: req.body.western_toilet,
          furnished: req.body.furnished,
          car_parking: req.body.car_parking,
          lift: req.body.lift,
          electricity: req.body.electricity,
          facing: req.body.facing,
        };
        if (hasProperty.length !== 1) {
          const newPropertyInfo = await PropertyDetailModel.create({
            property_detail: propertyDetail,
            tempId: `${user.username + user.userID}-1`,
          });

          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        } else {
          const newPropertyInfo = await PropertyDetailModel.updateOne({
            property_detail: propertyDetail,
            tempId: `${user.username + user.userID}-1`,
          });
          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.postGeneralInfo = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    const hasProperty = await GeneralInfoModel.find({
      tempId: { $eq: `${user.username + user.userID}-1` },
    });
    if (user) {
      try {
        const generalInfo = {
          name: req.body.name,
          mobile: req.body.mobile,
          posted_by: req.body.posted_by,
          sales_type: req.body.sales_type,
          featured_package: req.body.featured_package,
          PPD_package: req.body.PPD_package,
          imageURL: req.body.imageURL,
        };

        if (hasProperty.length !== 1) {
          const newPropertyInfo = await GeneralInfoModel.create({
            general_info: generalInfo,
            tempId: `${user.username + user.userID}-1`,
          });

          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        } else {
          const newPropertyInfo = await GeneralInfoModel.updateOne({
            general_info: generalInfo,
            tempId: `${user.username + user.userID}-1`,
          });
          res.status(200).json({
            status: "Success",
            newPropertyInfo,
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.postProperty = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);

    if (user) {
      try {
        const hasBasicInfo = await BasicInfoModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        const hasPropertyDetail = await PropertyDetailModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        const hasGeneralInfo = await GeneralInfoModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        const basicInfo = { ...hasBasicInfo };
        const propertyDetail = { ...hasPropertyDetail };
        const generalInfo = { ...hasGeneralInfo };
        const currentDate = new Date();
        const expiryDate = new Date(
          currentDate.setDate(currentDate.getDate() + 15)
        );

        const locationInfo = {
          email: req.body.email,
          city: req.body.city,
          area: req.body.area,
          pincode: req.body.pincode,
          address: req.body.address,
          landmark: req.body.landmark,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        };

        const data = {
          basic_info: basicInfo[0].basic_info,
          property_detail: propertyDetail[0].property_detail,
          general_info: generalInfo[0].general_info,
          location_info: locationInfo,
          username: user.username,
          userID: user.userID,
          PPD_ID: `PPD${randomFiveDigitInteger()}`,
          date_of_expiry: expiryDate,
        };

        const newPropertyInfo = await PropertyModel.create(data);

        const deleteBasicInfo = await BasicInfoModel.deleteOne({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        const deletePropertyDetail = await PropertyDetailModel.deleteOne({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        const deleteGeneralInfo = await GeneralInfoModel.deleteOne({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });

        res.status(200).json({
          status: "Success",
          newPropertyInfo,
        });
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await PropertyModel.find().sort({ _id: -1 });
    res.send(properties);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getUserProperties = async (req, res) => {
  const userId = { user_id: req.params.userId };
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const properties = await PropertyModel.find({
          userID: { $eq: userId.user_id },
        });
        res.send(properties);
      } catch (err) {
        res.status(500).json({
          status: "Failed",
          message: err.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getBasicInfo = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const property = await BasicInfoModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        res.send(property);
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getPropertyDetail = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const property = await PropertyDetailModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        res.send(property);
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getGeneralInfo = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const property = await GeneralInfoModel.find({
          tempId: { $eq: `${user.username + user.userID}-1` },
        });
        res.send(property);
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.updateProperty = async (req, res) => {
  const PPD_ID = { PPD_ID: req.params.ppdId };
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const updatedProperty = await PropertyModel.updateOne(PPD_ID, req.body);
        if (updatedProperty.modifiedCount === 1) {
          res.status(200).json({
            status: "Success",
            message: "Property updated successfully.",
          });
        } else {
          res.status(500).json({
            status: "Failed",
            message: "There is no changes to update!",
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  const PPD_ID = { PPD_ID: req.params.ppdId };
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const deleteProperty = await PropertyModel.deleteOne(PPD_ID);
        if (deleteProperty.deletedCount) {
          res.status(200).json({
            status: "Success",
            message: "Property deleted successfully.",
          });
        } else {
          res.status(400).json({
            status: "Failed",
            message: "Please enter valid Property details!",
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getSearchProperty = async (req, res) => {
  const PPD_ID = { PPD_ID: req.params.ppdId };
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (user) {
      try {
        const searchProperty = await PropertyModel.findOne(PPD_ID);
        if (searchProperty) {
          res.send(searchProperty);
        } else {
          res.status(400).json({
            status: "Failed",
            message: "Please enter valid PPD ID!",
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
