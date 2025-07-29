import User from "@/model/userModel";
import { NextResponse } from "next/server";

/**
 * Retrieves user data from the database and returns it as a JSON response.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} The JSON response containing the user data.
 */

export async function GET(request) {
  // Check if user is logged in
  const token = request.cookies.get("token")?.value || "";

  // If user is not logged in, return an appropriate response
  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  // If user is logged in, get user data
  try {
    const user = await User.find({}, { name: 1, surname: 1 });
    const userData = user.map((user) => ({
      name: user.name,
      surname: user.surname,
    }));
    return NextResponse.json({
      status: 200,
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Unable to find user",
      status: 404,
    });
  }
}
