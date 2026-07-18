import CategoryModal from "../model/CategoryModal.js";
import Enquiry from "../model/Enquiry.js";
import ProductModel from "../model/ProductModel.js";

export const DashboardData = async (req,res) => {
  const totalDocument = await ProductModel.estimatedDocumentCount();
  const totalCatgroy=await CategoryModal.estimatedDocumentCount();
  const totalEnquiry=await Enquiry.estimatedDocumentCount()

  return res.json({
    message:"sucess",
    data:{
        totalDocument,
        totalCatgroy,
        totalEnquiry
    }
  })
};
