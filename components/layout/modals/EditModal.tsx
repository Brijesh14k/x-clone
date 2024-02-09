import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useEditModal } from "@/hooks/useEditModal";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchUser } = useUser(currentUser?.id)
    const editModal = useEditModal()
    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser])
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchUser();
            toast.success("Profile Updated")
            editModal.onClose()
        } catch (err) {
            console.log(err)
        
            toast.error("Something Went Wrong")
        }
        finally {
            setIsLoading(false)
        }
    }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchUser])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
            <Input placeholder="name" onChange={(e) => {
                setName(e.target.value)
            }}
                value={name}
                disabled={isLoading} />
            <Input placeholder="Username" onChange={(e) => {
                setUsername(e.target.value)
            }}
                value={username}
                disabled={isLoading} />
            <Input placeholder="Bio" onChange={(e) => {
                setBio(e.target.value)
            }}
                value={bio}
                disabled={isLoading} />

        </div>
    )
    return <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit Your profile"
        actionLabel="Save"
        onclose={editModal.onClose}
        onsubmit={onSubmit}
        body={bodyContent}
    />
}