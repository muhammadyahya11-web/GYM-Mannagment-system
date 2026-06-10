import { Home, Dumbbell, Users, CalendarCheck, CreditCard, Settings } from "lucide-react";

export const SidebarConfig = {
    owner: [
        {
            label: "Dashboard",
            path: "/owner/dashboard",
            icon: "dashboard",
        },
        {
            label: "Gym Management",
            icon: "gym",
            children: [
                { label: "Gym Profile", path: "/owner/gym-profile" },
                { label: "Membership Plans", path: "/owner/membership-plans" },
            ],
        },
        {
            label: "People",
            icon: "user",
            children: [
                { label: "Members", path: "/owner/member" },
                { label: "Trainers", path: "/owner/trainer" },
            ],
        },
        {
            label: "Attendance",
            path: "/owner/attendance",
            icon: "attendance",
        },
        {
            label: "Payments",
            icon: "payment",
            children: [
                { label: "All Payments", path: "/owner/payments/all" },
                { label: "Pending Payments", path: "/owner/payments/pending" },
            ],
        },
        {
            label: "Reports",
            children: [
                { label: "Monthly Reports", path: "/owner/reports/monthly" },
                { label: "Yearly Reports", path: "/owner/reports/yearly" },
            ],
        },
        {
            label: "Setting",
            path: "/owner/setting",
            icon: "setting",
        },
    ],
    user: [
        {
            label: "Dashboard",
            path: "/",
            icon: "dashboard",
        }, {
            label: "MemberShip",
            children: [
                {
                    label: "Renew Membership",
                    path: "/user/membership/Renew",
                },
                {
                    label: "Pay Fee",
                    path: "/user/membership/payfee",
                }


            ]

        },
        {
            label: " Planes",
            icon: "planes",
            children:[
                 {
            label: "Workout",
            path: "/user/workoutplane",
            icon: "daiet",

        } ,
         {
            label: "Daiet",
            path: "/user/daietplane",
            icon: "daiet",

        } ,

            ]

        } ,
         
        {
            label: "Attendence",
            icon: "Attendence",
            path : "/user/attendence"
        },
        {
            label: "Progress",
            icon: "Progress",
            path : "/user/progress"

        },
        {
            label: " t-chat ",
            icon: "chat",
            path : "/user/chat-trainer"
        } ,
        {
            label: " AI-Trainer ",
            icon: "AItraiiner",
            path : "/user/AI-trainer"

        },
         {
            label: "Setting",
            path: "/user/setting",
            icon: "setting",
        },



    ]
};
