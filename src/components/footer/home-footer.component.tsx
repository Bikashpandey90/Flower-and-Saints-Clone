import { Button } from "@/components/ui/button";
import { LucideFacebook, LucideInstagram, LucideTwitter, LucideYoutube } from "lucide-react";
import * as Yup from "yup";
import { InputType, TextInputField } from "../form/input-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import footerSvc from "./footer.service";
import { useState } from "react";

const HomeFooter = () => {

  const NewsLetterDTO = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),

  })
  const [loading, setloading] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(NewsLetterDTO) });


  const submitForm = async (data: { email: string }) => {
    setloading(true)

    try {
      const formattedData = {
        email: data.email
      }

      let response = await footerSvc.newsLetter(formattedData)

      console.log(response)
      toast.info("News Letter subscribed")

    } catch (exception) {
      console.log(exception)
      toast.error("Error subscribing to news letter")
    }
    finally {
      setloading(false)
    }

  }


  return <>
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Company</h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover:text-gray-900">About Us</a></li>
              <li><a href="/careers" className="hover:text-gray-900">Careers</a></li>
              <li><a href="/press" className="hover:text-gray-900">Press</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-gray-900">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-gray-900">FAQ</a></li>
              <li><a href="/returns" className="hover:text-gray-900">Returns & Exchanges</a></li>
              <li><a href="/shipping" className="hover:text-gray-900">Shipping Information</a></li>
            </ul>
          </div>

          {/* Quick as */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick as</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="hover:text-gray-900">All Products</a></li>
              <li><a href="/new-arrivals" className="hover:text-gray-900">New Arrivals</a></li>
              <li><a href="/sale" className="hover:text-gray-900">Sale Items</a></li>
              <li><a href="/blog" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-2">
              {/* <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              /> */}
              <TextInputField
                placeholder="Enter your email"
                name="email"
                control={control}
                type={InputType.EMAIL}
                errMsg={errors.email?.message as string}

              />
              <Button type="submit" className="w-full" disabled={loading}>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 ">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <LucideFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <LucideTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <LucideInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <LucideYoutube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Ecom Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>;
};
export default HomeFooter