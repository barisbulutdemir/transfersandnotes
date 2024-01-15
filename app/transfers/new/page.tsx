"use client";
import {
  cargoChoices,
  trailerChoices,
} from "@/components/post/NewPostSelectItems";
import NewPostTypeSelect from "@/components/post/NewPostTypeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { NewPostLocationSelector } from "@/components/post/NewPostLocationSelector";
import { CountrySelector } from "@/components/post/NewPostCountrySelector";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { setSelectedCountry } from "@/redux/services/countrySelectSlice";
import ReactCountryFlag from "react-country-flag"

interface FormData {
  shipping_date: string;
  distance: string;
  pickup_location: string;
  dropoff_location: string;
  cargo_type: string;
  cargo_weight: string;
  trailer_type: string;
  shipping_fee: string;
  status: string;
  driver_info: string;
  vehicle_info: string;
  security_info: string;
  cargo_image: File | null;
}

const CreatePostForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    shipping_date: "",
    distance: "",
    pickup_location: "",
    dropoff_location: "",
    cargo_type: "",
    cargo_weight: "",
    trailer_type: "",
    shipping_fee: "",
    status: "",
    driver_info: "",
    vehicle_info: "",
    security_info: "",
    cargo_image: null,
  });

  const selectedCountry = useAppSelector((state: RootState) => state.country.selectedCountry);
  const dispatch = useAppDispatch();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/posts/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      // Başarılı sonuç işlemleri
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Post oluşturma başarısız!");
        console.log(formData);

        // Eğer axios ile özel bir hata mesajı almak isterseniz:
        if (error.response) {
          console.log("Error response:", error.response);
        }
      } else {
        console.error(error);
      }
    }
  };


  const handleSelectChange = (name: string, selectedValue: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: selectedValue }));
  };

  const handleSelectCity = (selectedValue: string) => {
    setFormData({ ...formData, pickup_location: selectedValue });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-4xl font-semibold">New Transfer</h1>

        <form onSubmit={handleSubmit} className=" w-[500px] mt-20 ">
          <div className="flex justify-between gap-4">
            <Label>
              Shipping Date:
              <Input
                type="date"
                name="shipping_date"
                value={formData.shipping_date}
                onChange={handleChange}
                className="mt-2"
              />
            </Label>
            <Label className="">
              Cargo Type:
              <NewPostTypeSelect
                title="Yük Tipi"
                value=""
                options={cargoChoices}
                onChange={(selectedValue) =>
                  handleSelectChange("cargo_type", selectedValue)
                }
              />
            </Label>
            <Label>
              Distance:
              <Input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="mt-2"
              />
            </Label>
          </div>
          <div>
         
      <NewPostLocationSelector
       
      />
      <ReactCountryFlag countryCode="US" />

<ReactCountryFlag
    className="emojiFlag"
    countryCode="US"
    style={{
        fontSize: '2em',
        lineHeight: '2em',
    }}
    aria-label="United States"
/>

          </div>
          <Label className="mt-2">
            Yükleme Lokasyonu :
            <Input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
            />
          </Label>
          <Label className="">
            İndirme Lokasyonu:
            <Input
              type="text"
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
            />
          </Label>

          <div className="my-10 flex justify-between gap-4">
            <Label>
              Yük Ağırlığı:
              <Input
                type="text"
                name="cargo_weight"
                value={formData.cargo_weight}
                onChange={handleChange}
                className="mt-2"
              />
            </Label>
            <Label className="">
              Dorse Tipi:
              <NewPostTypeSelect
                title="Dorse Tipi"
                value=""
                options={trailerChoices}
                onChange={(selectedValue) =>
                  handleSelectChange("trailer_type", selectedValue)
                }
              />
            </Label>
            <Label>
              Ücret:
              <Input
                type="text"
                name="shipping_fee"
                value={formData.shipping_fee}
                onChange={handleChange}
                className="mt-2"
              />
            </Label>
          </div>
          <div className="flex justify-between">
            <Link href="/transfers">
              <Button variant="destructive">Cancel</Button>
            </Link>

            <Button onClick={handleSubmit}>Oluştur</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePostForm;
