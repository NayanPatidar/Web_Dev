import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerficationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        from: 'nayanpatidar29@gmail.com',
        to: email,
        subject: 'Mystery Message Verification Code',
        react: VerificationEmail({ username, otp: verifyCode }),
      });
  
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.log("Error sending email verification : " + emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
