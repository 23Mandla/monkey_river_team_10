import { NextResponse } from 'next/server';
import User from '@/model/UserSchema';

export async function GET(req, { params }) {
  try {
    const user = await User.findById(params.id).select('-password');
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const updates = await req.json();
    if (updates.password) delete updates.password;

    const user = await User.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Error updating user' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await User.findByIdAndDelete(params.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }
}
