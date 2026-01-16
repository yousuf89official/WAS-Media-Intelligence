"use client";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card, CardContent, CardHeader, CardTitle,
    Input,
    Label,
    Slider,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui';

interface CalculatorFormProps {
    onCalculate: (values: any) => void;
}

export const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
    const { register, watch, setValue } = useForm({
        defaultValues: {
            platform: 'instagram',
            impressions: 100000,
            cpm: 12.50,
            sentiment: 50, // 0-100 (Neutral at 50)
            engagement: 'moderate'
        }
    });

    const platform = watch('platform');
    const impressions = watch('impressions');
    const cpm = watch('cpm');
    const sentiment = watch('sentiment');
    const engagement = watch('engagement');

    useEffect(() => {
        onCalculate({ platform, impressions, cpm, sentiment, engagement });
    }, [platform, impressions, cpm, sentiment, engagement, onCalculate]);

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/5">
            <CardHeader>
                <CardTitle>Campaign Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Platform Selection */}
                <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select onValueChange={(val) => setValue('platform', val)} defaultValue={platform}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="instagram">Instagram (x1.2)</SelectItem>
                            <SelectItem value="tiktok">TikTok (x1.5)</SelectItem>
                            <SelectItem value="facebook">Facebook (x1.0)</SelectItem>
                            <SelectItem value="linkedin">LinkedIn (x1.8)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Core Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Impressions</Label>
                        <Input
                            type="number"
                            {...register('impressions', { valueAsNumber: true })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>CPM Rate ($)</Label>
                        <Input
                            type="number"
                            step="0.5"
                            {...register('cpm', { valueAsNumber: true })}
                        />
                    </div>
                </div>

                {/* Sentiment Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Brand Sentiment Score</Label>
                        <span className="text-sm font-medium text-muted-foreground">{sentiment}/100</span>
                    </div>
                    <Slider
                        value={[sentiment]}
                        max={100}
                        step={1}
                        onValueChange={(val) => setValue('sentiment', val[0])}
                        className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Negative (x0.5)</span>
                        <span>Neutral (x1.0)</span>
                        <span>Positive (x1.2)</span>
                    </div>
                </div>

                {/* Engagement Level */}
                <div className="space-y-2">
                    <Label>Engagement Volume</Label>
                    <Select onValueChange={(val) => setValue('engagement', val)} defaultValue={engagement}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select engagement" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low - &lt;1% (x0.9)</SelectItem>
                            <SelectItem value="moderate">Moderate - 1-3% (x1.0)</SelectItem>
                            <SelectItem value="high">High - 3-5% (x1.15)</SelectItem>
                            <SelectItem value="viral">Viral - &gt;5% (x1.5)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </CardContent>
        </Card>
    );
};
