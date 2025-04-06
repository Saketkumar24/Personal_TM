import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from "../redux/slices/api/userApiSlice";
import ViewNotification from "./ViewNotification";

// ✅ Rename local dummy data to avoid conflict with API `data`
const sampleNotifications = [
  {
    _id: "67eabdd0081f8ea2b18dc7b4",
    team: ["67eac02eeee78765a36abfda", "67eac05deee78765a36abfde"],
    text: "New task has been assigned to you and 2 others. Priority: normal. Task date: Feb 29, 2025.",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
  },
  {
    _id: "67efb5840fe50d2d91b2726c",
    team: ["67efb90139523f60e3d7bddf", "67eac05deee78765a36abfde"],
    text: "New task has been assigned. Priority: high. Task date: Feb 09, 2025.",
    task: { _id: "67efb73e39523f60e3d7bddc", title: "Test task" },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
  },
];

const ICONS = {
  alert: <HiBellAlert className='h-5 w-5 text-black group-hover:text-indigo-600' />,
  message: <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />,
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: notiData, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotiAsReadMutation();

  const notifications = notiData && notiData.length > 0 ? notiData : sampleNotifications;

  const viewHandler = async (el) => {
    setSelected(el);
    await readHandler("one", el._id);
    setOpen(true);
  };

  const readHandler = async (type, id) => {
    try {
      await markAsRead({ type, id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-blue-700 relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {notifications.length > 0 && (
              <span className='absolute top-0 right-1 w-4 h-4 text-xs text-white bg-red-600 rounded-full flex items-center justify-center'>
                {notifications.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
            {({ close }) => (
              <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                <div className='p-4'>

                  {/* ✅ Special Alert Box for FIRST alert */}
                  {notifications[0]?.notiType === "alert" && (
                    <div className='mb-3 p-3 bg-yellow-100 text-yellow-800 text-sm rounded-lg shadow'>
                      <strong>Alert:</strong> {notifications[0].text}
                    </div>
                  )}

                  {notifications.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id + index}
                      className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                    >
                      <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                        {ICONS[item.notiType]}
                      </div>
                      <div className='cursor-pointer' onClick={() => viewHandler(item)}>
                        <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                          <p>{item.notiType}</p>
                          <span className='text-xs font-normal lowercase'>
                            {moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className='line-clamp-1 mt-1 text-gray-600'>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='grid grid-cols-2 divide-x bg-gray-50'>
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      onClick={
                        item?.onClick ? () => item.onClick() : () => close()
                      }
                      className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};

export default NotificationPanel;
