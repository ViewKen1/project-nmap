import axios from "axios";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Home() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    maxRetries: null,
    hostTimeout: null,
    areaStart: null,
    areaEnd: null,
    target: null,
  });

  const handleSubmit = async () => {
    if (formData.areaStart < 0 || formData.areaEnd > 1000) {
      setErrors({ area: "Area must be between 0 and 1000" });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3001/api/cmd1?maxRetries=${formData.maxRetries}&hostTimeout=${formData.hostTimeout}&areaStart=${formData.areaStart}&areaEnd=${formData.areaEnd}&target=${formData.target}`
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      Wecolme to my website
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="maxRetries"
            >
              maxRetries
            </label>
            <input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, maxRetries: e.target.value }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maxRetries"
              type="text"
              placeholder="maxRetries"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hostTimeout"
            >
              hostTimeout
            </label>
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  hostTimeout: e.target.value,
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hostTimeout"
              type="text"
              placeholder="hostTimeout"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="area"
            >
              area
            </label>
            <input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, areaStart: e.target.value }))
              }
              placeholder="areaStart"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="areaStart"
              type="number"
            />
            <input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, areaEnd: e.target.value }))
              }
              placeholder="areaEnd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="areaEnd"
              type="number"
            />
            {errors.area && (
              <p className="text-red-500 text-xs italic">{errors.area}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="target"
            >
              target
            </label>
            <input
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  target: e.target.value,
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="target"
              type="text"
              placeholder="target"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}
