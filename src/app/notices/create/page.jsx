"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "@/components/reusable/MultiSelectField";
import InputField from "@/components/reusable/InputField";
import DatePickField from "@/components/createNotice/DatePickField";
import NoticeBody from "@/components/createNotice/NoticeBody";
import UploadAttach from "@/components/createNotice/UploadAttach";
import Button from "@/components/reusable/Button";
import Link from "next/link";
import { useCreateNotice } from "@/hooks/useCreateNotice";

// Dummy data
const employees = [
  { _id: "EMP001" },
  { _id: "EMP002" },
  { _id: "EMP003" },
  { _id: "EMP004" },
  { _id: "EMP005" },
  { _id: "EMP006" },
  { _id: "EMP007" },
  { _id: "EMP008" },
  { _id: "EMP009" },
  { _id: "EMP010" },
  { _id: "EMP011" },
  { _id: "EMP012" },
  { _id: "EMP013" },
  { _id: "EMP014" },
  { _id: "EMP015" },
  { _id: "EMP016" },
  { _id: "EMP017" },
  { _id: "EMP018" },
  { _id: "EMP019" },
  { _id: "EMP020" },
];

const noticeTypes = [
  { type: "Warning / Disciplinary" },
  { type: "Performance Improvement" },
  { type: "Appreciation / Recognition" },
  { type: "Attendance / Leave Issue" },
  { type: "Payroll / Compensation" },
  { type: "Contract / Role Update" },
  { type: "Advisory / Personal Reminder" },
];

const employeePositions = [
  { position: "Software Engineer" },
  { position: "Frontend Developer" },
  { position: "Backend Developer" },
  { position: "Full Stack Developer" },
  { position: "UI/UX Designer" },
  { position: "QA Engineer" },
  { position: "DevOps Engineer" },
  { position: "Project Manager" },
  { position: "HR Executive" },
  { position: "Business Analyst" },
  { position: "IT Support Specialist" },
  { position: "Network Engineer" },
  { position: "Data Analyst" },
  { position: "Database Administrator" },
  { position: "Technical Lead" },
];

/**
 * CreateNotice Component
 * ----------------------
 * Renders a fully controlled form for creating a notice.
 * - Uses reusable components for inputs, selects, multi-select, date picker, and attachments
 * - Keeps all form data in a single state object
 * - Supports dynamic rendering of employee details and notice settings
 */
const CreateNotice = () => {
  const {
    noticeData,
    setNoticeData,
    departmentSelectToggle,
    handleOnChange,
    handlePublish,
  } = useCreateNotice();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <Link
          href={"/notices"}
          className="border border-gray rounded-lg px-3 py-2"
        >
          <ChevronLeft size={16} />
        </Link>
        <h1 className="text-xl font-medium"> Create a Notice</h1>
      </div>

      {/* Form container */}
      <div className="mt-8 border-[0.5px] border-steel-blue rounded-xl overflow-hidden">
        <h2 className="text-base font-medium py-4 px-6 border-b-[0.5px] border-steel-blue">
          Please fill in the details below
        </h2>

        <div className="bg-white p-6">
          {/* Departments/Individual multiselect */}
          <div className="bg-dark-white py-[22px] px-6 rounded-lg relative">
            <Label>
              <span className="text-danger">*</span> Target Departments or
              Individual
            </Label>

            <MultiSelect
              options={[
                "Individual",
                "All Department",
                "Finance",
                "Sales Team",
                "Web Team",
                "Database Team",
                "Admin",
                "HR",
              ]}
              placeholder={"Select departments"}
              toggle={departmentSelectToggle}
              selected={noticeData?.target_department}
            />
          </div>

          {/* Notice Title */}
          <div className="mt-8">
            <InputField
              required={true}
              label={" Notice Title"}
              placeholder={"Write the title of notice"}
              type={"text"}
              name={"title"}
              value={noticeData?.title}
              onChange={handleOnChange}
            />

            {/* Render employee selection fields only if 'Individual' is selected */}
            {noticeData?.target_department.includes("Individual") && (
              <div className="lg:grid grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Select employee ID/Designation  */}
                <div className=" mt-6">
                  <Label>
                    <span className="text-sm text-danger">*</span> Select
                    Employee ID
                  </Label>
                  <Select
                    value={noticeData?.employee_id}
                    onValueChange={(v) =>
                      setNoticeData((prev) => ({ ...prev, employee_id: v }))
                    }
                  >
                    <SelectTrigger className="w-full h-11! border-[0.5px] border-steel-blue mt-2 text-steel-blue">
                      <SelectValue placeholder="Select employee designation" />
                    </SelectTrigger>
                    <SelectContent
                      className={"border-[0.5px] border-steel-blue bg-white "}
                    >
                      <SelectGroup>
                        {employees?.map((e) => (
                          <SelectItem key={e._id} value={e._id}>
                            {e._id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee Name  */}
                <InputField
                  type={"text"}
                  name={"employee_name"}
                  label={"Employee Name"}
                  required={true}
                  placeholder={"Enter employee full name"}
                  value={noticeData?.employee_name}
                  onChange={handleOnChange}
                />

                {/* Select employee position  */}
                <div className="mt-6 lg:col-span-2 xl:col-span-1">
                  <Label>
                    <span className="text-sm text-danger">*</span> Select
                    Employee Position
                  </Label>
                  <Select
                    value={noticeData?.employee_position}
                    onValueChange={(v) =>
                      setNoticeData((prev) => ({
                        ...prev,
                        employee_position: v,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-11! border-[0.5px] border-steel-blue mt-2 text-steel-blue">
                      <SelectValue placeholder="Select employee position" />
                    </SelectTrigger>
                    <SelectContent
                      className={"border-[0.5px] border-steel-blue bg-white"}
                    >
                      <SelectGroup>
                        {employeePositions?.map((p) => (
                          <SelectItem key={p.position} value={p.position}>
                            {p.position}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="md:grid grid-cols-2 gap-4">
              {/* Notice type  */}
              <div className="mt-6">
                <Label>
                  <span className="text-danger">*</span> Notice Type
                </Label>

                <Select
                  value={noticeData?.type}
                  onValueChange={(v) =>
                    setNoticeData((prev) => ({ ...prev, type: v }))
                  }
                >
                  <SelectTrigger className="w-full h-11! border-[0.5px] border-steel-blue mt-2 text-steel-blue">
                    <SelectValue placeholder="Select notice type" />
                  </SelectTrigger>
                  <SelectContent
                    className={"border-[0.5px] border-steel-blue bg-white"}
                  >
                    <SelectGroup>
                      {noticeTypes?.map((n) => (
                        <SelectItem key={n.type} value={n.type}>
                          {n.type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Publish Date picker (controlled) */}
              <DatePickField />
            </div>

            {/* Notice body textarea (controlled) */}
            <NoticeBody />

            {/* Upload attachments (controlled) */}
            <UploadAttach />
          </div>
        </div>
      </div>

      {/* Action buttons   */}
      <div className="flex justify-end gap-4 mt-8">
        <Button className="btn-rounded">Cancel</Button>
        <Button className="btn-rounded border-primary-blue text-primary-blue">
          Save as Draft
        </Button>
        <Button
          onClick={handlePublish}
          className="btn-rounded bg-danger text-white border-none flex items-center gap-2"
        >
          <Check />
          <span>Publish Notice</span>
        </Button>
      </div>
    </div>
  );
};

export default CreateNotice;
