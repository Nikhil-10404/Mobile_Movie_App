import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "@/components/search";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import Moviecard from "@/components/moviecard";
import { getTrendingMovies } from "@/services/appwrite";
import { validatePathConfig } from "expo-router/build/fork/getPathFromState-forks";
import TrendingCard from "@/components/trendingcard";


export default function Index() {
  const router = useRouter();
  const{data:trendingMovies, loading:trendingLoading, error:trendingError }=useFetch(getTrendingMovies);

  const{data:movies, loading:moviesLoading, error:moviesError}=useFetch(()=>fetchMovies({query:""}))

  return (
   <View className="flex-1 bg-primary">
    <Image source={images.bg} className="absolute w-full z-0 "/>

    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:'100%', paddingBottom:10}} >
      <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto mb-5"/>

       {moviesLoading || trendingLoading?(
        <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10, self-center"
        />
       ): moviesError || trendingError?(
        <Text>Error:{moviesError?.message|| trendingError?.message}</Text>
       ):(
        <View className="flex-1 mt-5">
       <SearchBar
        onPress={()=>router.push("/search")}
        placeholder="Search for a Movie"
       />
       {trendingMovies&&(
        <View className="mt-10 ">
          <Text  className="text-lg text-white font-bold mb-3">Trending Movies</Text>
        </View>
       )}
       <>
          <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          data={trendingMovies} 
          className="mb-4 mt-3"
          renderItem={({item,index})=>(<TrendingCard movie={item} index={index}/>)}
          keyExtractor={(item)=>item.movie_id.toString()}
          >
          </FlatList>

          <Text className="text-lg text-white mb-3 font-bold mt-5">
            Latest Movies
          </Text>
           <FlatList
            data={movies}
            renderItem={({item})=>(
            <Moviecard {... item}/>
            )}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent:'flex-start',
              gap:20,
              paddingRight:5,
              marginBottom:10
            }}

            className="mt-2 pb-32"
            scrollEnabled={false}
           />

       </>
      </View>
       )}

     

    </ScrollView>

   </View>
  );
}
