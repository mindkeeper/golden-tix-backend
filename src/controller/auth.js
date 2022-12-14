const authRepo = require("../model/auth");
const resHelper = require("../helper/sendResponse");
const { mailSender } = require("../helper/mail");

const register = async (req, res) => {
  try {
    const regist = await authRepo.register(req);

    const setSendMail = {
      to: req.body.email,
      subject: "Email Verification",
      name: req.body.firstName,
      template: "verifyEmail.html",
      link: `https://golden-tix-backend.vercel.app/api/auth/verify/${regist.otp}`,
      imgUrl:
        "https://res.cloudinary.com/dedmbkp9a/image/upload/v1669954703/Golden-tix/logo-golden_wll98o.png",
    };
    const response = await mailSender(setSendMail);

    return resHelper.success(res, response.status, response);
  } catch (error) {
    console.log(error);
    return resHelper.error(res, error.status || 500, error);
  }
};

const login = async (req, res) => {
  try {
    const response = await authRepo.login(req);
    return resHelper.success(res, response.status, response);
  } catch (error) {
    return resHelper.error(res, error.status, error);
  }
};

const logout = async (req, res) => {
  try {
    const response = await authRepo.logout(req);
    return resHelper.success(res, response.status, response);
  } catch (error) {
    return resHelper.error(res, error.status, error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const forgot = await authRepo.forgotPassword(req);
    const linkDirect = req.body.linkDirect;
    console.log(req.body);
    const setSendMail = {
      to: req.body.email,
      subject: "Reset Password",
      name: forgot.firstName,
      template: "verifyPasswordOtp.html",
      link: `${linkDirect}?otp=${forgot.otp}`,
      imgUrl:
        "https://res.cloudinary.com/dedmbkp9a/image/upload/v1669954703/Golden-tix/logo-golden_wll98o.png",
    };
    const response = await mailSender(setSendMail);
    return resHelper.success(res, response.status, response);
  } catch (error) {
    console.log(error);
    return resHelper.error(res, error.status, error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await authRepo.resetPassword(req);
    return resHelper.success(res, response.status, response);
  } catch (error) {
    return resHelper.error(res, error.status, error);
  }
};

const verify = async (req, res) => {
  try {
    const response = await authRepo.verify(req);
    return resHelper.success(res, response.status, response);
  } catch (error) {
    return resHelper.error(res, error.status, error);
  }
};

const authController = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verify,
};

module.exports = authController;
