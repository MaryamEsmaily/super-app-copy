'use client';
import React from 'react';
import TextInput from '@/lib/components/TextInput';
import Button from '@/lib/components/Button';

const Home = () => (
  <div className="w-full space-y-5 px-8 my-5">
    <Button title="تست ۱" variant="primary" size="small" disabled onClick={() => {}} />
    <Button title="تست ۱" variant="primary" size="normal" onClick={() => {}} />

    <Button title="تست ۲" variant="outline" size="small" onClick={() => {}} />
    <Button title="تست ۲" variant="outline" size="normal" disabled onClick={() => {}} />

    <Button title="تست ۳" variant="link" size="small" onClick={() => {}} />
    <Button title="تست ۳" variant="link" size="normal" disabled onClick={() => {}} />

    <TextInput size="small" disabled label="تست" name="test" />
    <TextInput size="small" label="تست" name="test" />
    <TextInput size="normal" label="تست" name="test" />
  </div>
);

export default Home;
