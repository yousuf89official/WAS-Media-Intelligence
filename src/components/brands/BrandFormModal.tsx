import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { Brand } from '@/services/api';
import { Service, api } from '../../services/api';
import { toast } from 'sonner';

// Reusable form component to be used inside a Modal
export function BrandForm({
    brandToEdit,
    onSuccess,
    onCancel
}: {
    brandToEdit?: Brand | null,
    onSuccess: () => void,
    onCancel: () => void
}) {
    const isEditing = !!brandToEdit;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dropdown Data
    const [industryTypes, setIndustryTypes] = useState<{ id: string, name: string }[]>([]);
    const [subTypes, setSubTypes] = useState<{ id: string, name: string }[]>([]);

    const [formData, setFormData] = useState<Partial<Brand>>({
        name: '',
        industry: '', // Using this as industryTypeId
        industrySubTypeId: '',
        website: '',
        logo: '',
    });

    useEffect(() => {
        // Fetch Industries on mount
        const fetchIndustries = async () => {
            try {
                setError(null);
                const res = await api.industryTypes.getAll();
                setIndustryTypes(res);
            } catch (e: any) {
                console.error("Failed to fetch industries:", e);
                setError("Failed to load industry options.");
            }
        };
        fetchIndustries();

        if (brandToEdit) {
            setFormData({
                name: brandToEdit.name || '',
                industry: brandToEdit.industryTypeId || '', // Use ID for select value
                industrySubTypeId: brandToEdit.industrySubTypeId || '',
                website: brandToEdit.website || '',
                logo: brandToEdit.logo || ''
            });
            // Trigger fetch for existing selection
            if (brandToEdit.industry) {
                fetchSubTypes(brandToEdit.industry);
            }
        }
    }, [brandToEdit]);

    const fetchSubTypes = async (typeId: string) => {
        if (!typeId) {
            setSubTypes([]);
            return;
        }
        try {
            const res = await api.industrySubTypes.getAll(typeId);
            setSubTypes(res);
        } catch (e) { console.error(e); }
    };

    const handleIndustryChange = (value: string) => {
        setFormData(prev => ({ ...prev, industry: value, industrySubTypeId: '' })); // Reset sub-type
        fetchSubTypes(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const brandPayload: Partial<Brand> = {
                ...formData,
                status: 'active',
                id: isEditing ? brandToEdit?.id : undefined,
                campaignCount: isEditing ? brandToEdit.campaignCount : 0,
            };

            if (isEditing && brandToEdit?.id) {
                await Service.updateBrand(brandToEdit.id, brandPayload);
                toast.success("Brand updated successfully");
            } else {
                await Service.createBrand(brandPayload);
                toast.success("Brand created successfully");
            }
            onSuccess();
        } catch (error: any) {
            console.error("Failed to save brand", error);
            const msg = error.message || "Failed to save brand";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg">
            <DialogHeader>
                <DialogTitle className="text-slate-900">{isEditing ? 'Edit Brand' : 'New Brand'}</DialogTitle>
                <DialogDescription className="text-slate-500">
                    {isEditing ? 'Update brand details here.' : 'Add a new brand to your portfolio.'}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</div>}

                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-slate-700">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-slate-900"
                        placeholder="Brand Name"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="industry" className="text-slate-700">Industry</Label>
                        <Select onValueChange={handleIndustryChange} value={formData.industry}>
                            <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                                <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-[100] max-h-[200px]">
                                {industryTypes.length === 0 ? (
                                    <SelectItem value="none" disabled>No Industries Loaded</SelectItem>
                                ) : (
                                    industryTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subType" className="text-slate-700">Sub-Type</Label>
                        <Select
                            onValueChange={(val) => setFormData(prev => ({ ...prev, industrySubTypeId: val }))}
                            value={formData.industrySubTypeId}
                            disabled={!formData.industry}
                        >
                            <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                                <SelectValue placeholder={!formData.industry ? "Select Industry First" : "Select Sub-Type"} />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-[100] max-h-[200px]">
                                {subTypes.length === 0 ? (
                                    <SelectItem value="none" disabled>No Sub-Types Found</SelectItem>
                                ) : (
                                    subTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="website" className="text-slate-700">Website</Label>
                    <Input
                        id="website"
                        name="website"
                        value={formData.website || ''}
                        onChange={handleChange}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-slate-900"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="logo" className="text-slate-700">Logo (URL)</Label>
                    <Input
                        id="logo"
                        name="logo"
                        value={formData.logo || ''}
                        onChange={handleChange}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-slate-900"
                        placeholder="https://example.com/logo.png"
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={onCancel} className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50">Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-slate-900 text-white hover:bg-slate-800">
                        {loading ? 'Saving...' : (isEditing ? 'Update Brand' : 'Create Brand')}
                    </Button>
                </DialogFooter>
            </form>
        </div>
    );
}
