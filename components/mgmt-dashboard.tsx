"use client";

import React, { useEffect, useState } from 'react'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface OKRData {
  id: string;
  title: string;
  progress: number;
  keyResults: number;
  numberOfObjectives: number;
  userInitials: string;
  ownerName: string;
  ownerAvatar?: string; // Optional: Path to the avatar image
  lastUpdated: string;
  progressColor: string;
}

const MgmtDashboard = () => {
  const [okrData, setOkrData] = useState<OKRData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatLastUpdated = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 30) return `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(window.location.origin + '/api/dashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: OKRData[] = await response.json();

        // IMPORTANT: In a real application, the 'ownerAvatar' path
        // should come directly from your backend API after being
        // retrieved from your database or a mapping.
        // This is for demonstration purposes.
        const dataWithAvatars = data.map(item => {
            // return { ...item, ownerAvatar: '/adrian_goh.jpg' };
          if (item.ownerName.includes('Bernard Toh')) {
            return { ...item, ownerAvatar: '/bernard_toh.png' };
          } else if (item.ownerName.includes('Adrian Goh')) {
            return { ...item, ownerAvatar: '/adrian_goh.jpg' };
          } else if (item.ownerName.includes('Hui Boon')) {
            return { ...item, ownerAvatar: '/hui_boon.png' };
          } else if (item.ownerName.includes('Yingshan')) {
            return { ...item, ownerAvatar: '/yingshan.png' };
          } else if (item.ownerName.includes('Beng Huay')) {
            return { ...item, ownerAvatar: '/beng_huay.png' };
          } else if (item.ownerName.includes('Aaron')) {
            return { ...item, ownerAvatar: '/aaron.png' };
          } else if (item.ownerName.includes('Chun Kiam')) {
            return { ...item, ownerAvatar: '/chun_kiam.png' };
          } else if (item.ownerName.includes('Vincent')) {
            return { ...item, ownerAvatar: '/vincent.jpg' };
          } else if (item.ownerName.includes('Mui Kim')) {
            return { ...item, ownerAvatar: '/mui_kim.png' };
          } else if (item.ownerName.includes('Lynette Tan')) {
            return { ...item, ownerAvatar: '/lynette_tan.jpg' };
          } else if (item.ownerName.includes('Hygin Fernandez')) {
            return { ...item, ownerAvatar: '/hygin_fernandez.jpg' };
          } else if (item.ownerName.includes('Cynthia')) {
            return { ...item, ownerAvatar: '/cynthia.jpg' };
          } 
          
          // You can add more conditions for other avatars
          // else if (item.ownerName === 'Another User') {
          //   return { ...item, ownerAvatar: '/another_user.jpg' };
          // }
          return item; // Return item as is if no specific avatar
        });


        const sortedData = [...dataWithAvatars].sort((a, b) => {
          if (a.title === 'SCG' && b.title !== 'SCG') {
            return -1;
          }
          if (b.title === 'SCG' && a.title !== 'SCG') {
            return 1;
          }
          return a.title.localeCompare(b.title);
        });

        setOkrData(sortedData);
        console.log("Dashboard data:", sortedData);

        console.log("Full Names of Owners:");
        sortedData.forEach(item => {
          console.log(item.ownerName);
        });

      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          console.error("Failed to fetch dashboard data:", e);
        } else {
          setError("An unknown error occurred.");
          console.error("Failed to fetch dashboard data: An unknown error occurred", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const CircularProgress = ({ progress, color }: { progress: number; color: string }) => {
    const radius = 40;
    const strokeWidth = 9;
    const backgroundStrokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={backgroundStrokeWidth}
            fill="none"
            className="text-gray-300"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ stroke: color }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg font-bold"
            style={{ color: color }}
          >
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  const handleCardClick = (divisionTitle: string) => {
    const encodedDivision = encodeURIComponent(divisionTitle);
    window.location.href = `/division?name=${encodedDivision}`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (okrData.length === 0) {
    return <div className="text-center py-8 text-gray-500">No OKR data available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 p-6 bg-gray-50">
      {okrData.map((item) => (
        <Card
          key={item.id}
          className="bg-white border border-gray-300 hover:shadow-xl transition-shadow overflow-hidden cursor-pointer rounded-lg flex flex-col justify-between"
          onClick={() => handleCardClick(item.title)}
        >
          < div className="h-2 bg-[#78B9D4]" />
          <CardContent className="p-3 py-4 flex-grow">
            <div className="flex flex-col items-center space-y-2 mb-2">
              <CircularProgress progress={item.progress} color={item.progressColor} />
              <div className="text-center">
                <h3 className="font-semibold text-sm text-gray-900 tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-medium leading-tight mb-0.5">
                  {item.numberOfObjectives} Objectives
                </p>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  {item.keyResults} Key Results
                </p>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-between items-center px-3 pb-3">
            <Avatar className="w-6 h-6 shadow-sm border border-gray-300" title={item.ownerName}>
              {item.ownerAvatar ? (
                <AvatarImage src={item.ownerAvatar} alt={item.ownerName} />
              ) : (
                <AvatarFallback className="text-[0.75rem] font-bold text-white bg-gray-600">
                  {item.userInitials}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-xs text-gray-500 font-medium">
              {formatLastUpdated(item.lastUpdated)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MgmtDashboard;