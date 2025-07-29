import { NextResponse } from 'next/server';
import User from '@/model/UserSchema';  // adjust if path differs

export async function GET() {
  const users = await User.find().select('-password');
  return NextResponse.json(users);
}

export async function POST(req) {
  const body = await req.json();
  const { name, result, date, password } = body;

  if (!name || result == null || !date || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newUser = new User({ name, result, date, password });
  await newUser.save();

  return NextResponse.json({
    id: newUser._id,
    name: newUser.name,
    result: newUser.result,
    date: newUser.date,
  }, { status: 201 });
}
