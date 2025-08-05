"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Edit3 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/lib/api";

interface Method {
  method: string;
  description: string;
  layer4: boolean;
  layer7: boolean;
  amplification: boolean;
  premium: boolean;
  proxy: boolean;
}

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
}


export default function StressMethods() {
  const [methods, setMethods] = useState<Method[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingMethod, setEditingMethod] = useState("");
  const { currentTheme } = useTheme();

  // Form states
  const [method, setMethod] = useState("");
  const [description, setDescription] = useState("");
  const [layer4, setLayer4] = useState(false);
  const [layer7, setLayer7] = useState(false);
  const [amplification, setAmplification] = useState(false);
  const [premium, setPremium] = useState(false);
  const [proxy, setProxy] = useState(false);

  const fetchMethods = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/methods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods(res.data);
    } catch (err) {
      console.error("Failed to fetch methods:", err);
      setError("Failed to load methods");
    }
  };

  const resetForm = () => {
    setMethod("");
    setDescription("");
    setLayer4(false);
    setLayer7(false);
    setAmplification(false);
    setPremium(false);
    setProxy(false);
    setIsEditing(false);
    setEditingMethod("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method.trim() === "") {
      setError("Method name is required");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const methodData = {
        method: method.trim(),
        description: description.trim(),
        layer4,
        layer7,
        amplification,
        premium,
        proxy,
      };

      if (isEditing) {
        await api.put(`/methods/${editingMethod}`, methodData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        });
      } else {
        await api.post("/methods", methodData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
        });
      }

      await fetchMethods();
      resetForm();
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        const apiError = err as ApiError;
        const msg = apiError.response?.data?.detail || "Failed to process method";
        setError(msg);
      } else {
        setError("Failed to process method");
      }
    }

  };

  const handleEdit = (m: Method) => {
    setMethod(m.method);
    setDescription(m.description);
    setLayer4(m.layer4);
    setLayer7(m.layer7);
    setAmplification(m.amplification);
    setPremium(m.premium);
    setProxy(m.proxy);
    setIsEditing(true);
    setEditingMethod(m.method);
    setError("");
  };

  const handleDelete = async (methodName: string) => {
    if (!confirm(`Are you sure you want to delete the method "${methodName}"?`)) return;

    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`/methods/${methodName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods(methods.filter((m) => m.method !== methodName));
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        const apiError = err as ApiError;
        const msg = apiError.response?.data?.detail || "Failed to delete method";
        setError(msg);
      } else {
        setError("Failed to delete method");
      }
    }

  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchMethods();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className={`${currentTheme.dashboard.text} text-lg`}>Loading methods...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${currentTheme.dashboard.text}`}>Attack Method Management</h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${currentTheme.dashboard.cards} backdrop-blur-sm rounded-lg p-6 border ${currentTheme.dashboard.borders}`}
      >
        <h3 className={`text-lg font-medium ${currentTheme.dashboard.text} mb-4`}>
          {isEditing ? "Edit Method" : "Add Method"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Method Name"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
            disabled={isEditing}
            className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={`${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} rounded-lg px-4 py-2 ${currentTheme.dashboard.text} placeholder:${currentTheme.dashboard.textSecondary.replace('text-', '')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <label className={`flex items-center gap-2 ${currentTheme.dashboard.text}`}>
            <input type="checkbox" checked={layer4} onChange={() => setLayer4(!layer4)} className="accent-blue-500" />
            Layer 4
          </label>

          <label className={`flex items-center gap-2 ${currentTheme.dashboard.text}`}>
            <input type="checkbox" checked={layer7} onChange={() => setLayer7(!layer7)} className="accent-blue-500" />
            Layer 7
          </label>

          <label className={`flex items-center gap-2 ${currentTheme.dashboard.text}`}>
            <input type="checkbox" checked={amplification} onChange={() => setAmplification(!amplification)} className="accent-blue-500" />
            Amplification
          </label>

          <label className={`flex items-center gap-2 ${currentTheme.dashboard.text}`}>
            <input type="checkbox" checked={premium} onChange={() => setPremium(!premium)} className="accent-blue-500" />
            Premium
          </label>

          <label className={`flex items-center gap-2 ${currentTheme.dashboard.text}`}>
            <input type="checkbox" checked={proxy} onChange={() => setProxy(!proxy)} className="accent-blue-500" />
            Proxy
          </label>

          <div className="flex gap-2 md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              {isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className={`px-4 py-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} ${currentTheme.dashboard.text} rounded-lg hover:bg-gray-700 transition border ${currentTheme.dashboard.borders}`}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Table of methods */}
      <div className="overflow-x-auto">
        <table className={`w-full text-sm text-left ${currentTheme.dashboard.textSecondary} border ${currentTheme.dashboard.borders} rounded-lg`}>
          <thead className={`text-xs uppercase ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border-b ${currentTheme.dashboard.borders} ${currentTheme.dashboard.text}`}>
            <tr>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">L4</th>
              <th className="px-4 py-3">L7</th>
              <th className="px-4 py-3">Amplification</th>
              <th className="px-4 py-3">Premium</th>
              <th className="px-4 py-3">Proxy</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className={currentTheme.dashboard.cards}>
            {methods.length === 0 && (
              <tr>
                <td colSpan={8} className={`text-center py-4 ${currentTheme.dashboard.textSecondary}`}>
                  No methods found.
                </td>
              </tr>
            )}
            {methods.map((m) => (
              <tr key={m.method} className={`border-b ${currentTheme.dashboard.borders} hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')}`}>
                <td className="px-4 py-2">{m.method}</td>
                <td className="px-4 py-2">{m.description}</td>
                <td className="px-4 py-2">{m.layer4 ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{m.layer7 ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{m.amplification ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{m.premium ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{m.proxy ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className={`p-1 rounded hover:${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')}`}
                    title="Edit"
                    type="button"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.method)}
                    className="p-1 rounded hover:bg-red-700 text-red-400"
                    title="Delete"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
