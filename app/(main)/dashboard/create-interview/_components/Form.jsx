'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Code,
  User,
  Brain,
  BadgeCheck,
  Users,
  Puzzle,
  ArrowRight,
} from 'lucide-react';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

// Dynamically import react-select to avoid SSR issues
const ReactSelect = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Interview types with icons
const interviewTypes = [
  { label: "Technical", value: "technical", icon: Code },
  { label: "Fresher", value: "fresher", icon: User },
  { label: "Behaviour", value: "behaviour", icon: Users },
  { label: "Experienced", value: "experienced", icon: BadgeCheck },
  { label: "Problem Solving", value: "problem-solving", icon: Brain },
  { label: "Reasoning", value: "reasoning", icon: Puzzle },
];

// Interview durations
const durations = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "1 hour", value: "60" },
  { label: "1.5 hours", value: "90" },
  { label: "2 hours", value: "120" },
];

// Custom option component for react-select
const Option = (props) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;
  const Icon = data.Icon;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
        isFocused ? "bg-blue-100" : ""
      } ${isSelected ? "bg-blue-200 font-semibold" : ""}`}
    >
      <Icon size={16} />
      <span>{data.label}</span>
    </div>
  );
};

// Custom label inside selected chip
const MultiValueLabel = (props) => {
  const Icon = props.data.Icon;
  return (
    <div className="flex items-center gap-1">
      <Icon size={14} />
      <span>{props.data.label}</span>
    </div>
  );
};

const Form = ({ onHandleInputChange, GoToNextStep, formData }) => {
  const interviewOptions = interviewTypes.map(({ label, value, icon: Icon }) => ({
    label,
    value,
    Icon,
  }));

  const selectedInterviewTypes = interviewOptions.filter(option =>
    (formData.interviewType || []).includes(option.value)
  );

  return (
    <div className="p-6 bg-[#FAFAFA] border border-gray-200 rounded-xl shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 mb-6 font-sans">Interview Details</h1>

      {/* Job Role */}
      <div className="mb-5">
        <label htmlFor="jobRole" className="block text-md font-medium font-sans text-gray-700 mb-1">
          Job Role
        </label>
        <Input
          id="jobRole"
          name="jobRole"
          type="text"
          placeholder="e.g. Software Engineer"
          value={formData.jobRole || ""}
          onChange={onHandleInputChange}
          className="bg-white"
        />
      </div>

      {/* Job Description */}
      <div className="mb-5">
        <label htmlFor="jobDescription" className="block text-md font-medium font-sans text-gray-700 mb-1">
          Job Description
        </label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Write a brief description of the job role..."
          value={formData.jobDescription || ""}
          onChange={onHandleInputChange}
          className="bg-white min-h-[150px]"
        />
      </div>

      {/* Interview Duration */}
      <div className="mb-5">
        <label className="block text-md font-medium font-sans text-gray-700 mb-1">
          Interview Duration
        </label>
        <Select
          value={formData.interviewDuration || ""}
          onValueChange={(value) =>
            onHandleInputChange({ target: { name: 'interviewDuration', value } })
          }
        >
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type (Multi-select) */}
      <div>
        <label className="block text-md font-medium font-sans text-gray-700 mb-1">
          Interview Type
        </label>
        <ReactSelect
          isMulti
          options={interviewOptions}
          value={selectedInterviewTypes}
          onChange={(selected) => {
            const values = selected ? selected.map(item => item.value) : [];
            onHandleInputChange({ target: { name: "interviewType", value: values } });
          }}
          placeholder="Select interview types"
          className="basic-multi-select"
          classNamePrefix="select"
          components={{ Option, MultiValueLabel }}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button
          className="flex items-center gap-2 font-sans font-medium text-white bg-primary hover:bg-purple-400 cursor-pointer"
          onClick={GoToNextStep}
        >
          Generate Questions
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Form;
