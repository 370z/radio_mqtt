"use client";
import React from "react";
import CreateChannel from "./action";
import { useFormState } from "react-dom";

type Props = {};
const initState = {
  message: "",
};

const createChannel = (props: Props) => {
  const [state, formAction] = useFormState(CreateChannel, initState);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Sign Up Form</h3>
      </div>
      <form action={formAction}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="channelName"
              placeholder="Enter your channel name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter your description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Type
            </label>
            <select
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              defaultValue="STRING"
              name="channelType"
            >
              <option value="STRING">STRING</option>
              {/* <option value="">UK</option>
                    <option value="">Canada</option> */}
            </select>
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
            Create
          </button>
        </div>
      </form>
      Message: {state.message}
    </div>
  );
};

export default createChannel;
